/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-08 14:14:22
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-10 21:43:09
 * @FilePath: \RocketVPN\go-backend\controller\OrderHandler.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package controller

import (
	"go-backend/middleware"
	"go-backend/models"
	"go-backend/utils"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateOrder(c *gin.Context) {
	// 处理创建订单的逻辑
	// 这里可以使用 Stripe 或其他支付网关的 SDK 来处理订单创建请求
	// 例如，创建一个订单并返回给前端

	pid, _ := strconv.Atoi(os.Getenv("PAY_PID"))
	paymentParams := make(map[string]interface{})
	paymentParams["pid"] = pid
	paymentParams["notify_url"] = os.Getenv("PAY_NOTIFY_URL")
	paymentParams["return_url"] = os.Getenv("PAY_RETURN_URL")
	paymentParams["sign_type"] = os.Getenv("PAY_SIGN_TYPE")

	// 解析请求参数
	Claims, err := middleware.GetJwtClaims(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.Response{Code: 401, Message: "Unauthorized"})
		return
	}
	claimsData := Claims.ClaimsData.(map[string]interface{})
	jwtUserId := claimsData["id"].(string)
	log.Println(jwtUserId)

	//生成订单号
	OutTradeNo := uuid.New()
	log.Println(OutTradeNo)
	// 查询Subscribe表，获取金额
	var subscribe models.Subscribe
	if err := utils.DB.Where("id = ?", c.Query("subscribe_id")).First(&subscribe).Error; err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "Invalid subscribe_id"})
		return
	}

	count, err := strconv.ParseInt(c.Query("count"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "Invalid count parameter"})
		return
	}
	countUint := uint(count)

	if err := utils.DB.Model(&models.Order{}).Create(&models.Order{
		PaidUser:    jwtUserId,
		OutTradeNo:  OutTradeNo.String(),
		Amount:      subscribe.Money,
		Count:       &countUint,
		PaidStatus:  "unpaid",
		SubscribeId: subscribe.ID,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to create order"})
		return
	}
	log.Println(OutTradeNo)

	paymentParams["out_trade_no"] = OutTradeNo.String()
	paymentParams["name"] = subscribe.Name
	// paymentParams["count"] = countUint
	paymentParams["money"] = *subscribe.Money

	// 处理支付请求的逻辑
	// 这里可以使用 Stripe 或其他支付网关的 SDK 来处理支付请求
	// 例如，创建一个支付意图并返回给前端

	signStr, _ := utils.SortMapAndSign(paymentParams)
	paymentUrl, err := utils.Post(os.Getenv("PAY_URL") + "?" + signStr.String())

	if err != nil {
		// 处理错误
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to make payment"})
	}

	if paymentUrl == "" {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to create order"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Order created successfully", Data: map[string]interface{}{"payment_url": paymentUrl}})
}

func Notify(c *gin.Context) {
	// 处理支付通知的逻辑

	queryParams := make(map[string]interface{})

	queryParams["out_trade_no"] = c.Query("out_trade_no")
	queryParams["pid"] = c.Query("pid")
	queryParams["trade_no"] = c.Query("trade_no")
	queryParams["trade_status"] = c.Query("trade_status")
	queryParams["money"] = c.Query("money")
	queryParams["sign"] = c.Query("sign")
	queryParams["sign_type"] = c.Query("sign_type")
	queryParams["type"] = c.Query("type")
	queryParams["name"] = c.Query("name")

	out_trade_no := c.Query("out_trade_no")
	var subscribe models.Subscribe
	var order models.Order
	var user models.User

	log.Println(queryParams)
	// 验证签名
	if c.Query("trade_status") != "TRADE_SUCCESS" {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "Invalid trade_status"})
		return
	}

	_, sign := utils.SortMapAndSign(queryParams)

	if sign != c.Query("sign") {
		log.Println("invalid sign", sign)
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "Invalid sign"})
		return
	}

	if err := utils.DB.Model(&models.Order{}).Where("out_trade_no = ?", out_trade_no).First(&order).Update("paid_status", "paid").Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to update order"})
		return
	}

	if err := utils.DB.Model(&models.Subscribe{}).Where("id = ?", order.SubscribeId).First(&subscribe).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to find order"})
		return
	}

	if err := utils.DB.Model(&models.User{}).Where("id = ?", order.PaidUser).First(&user).Update("balance", *user.Balance+*subscribe.Balance).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to update user subscribe_id"})
		return
	}
	c.String(http.StatusOK, "success")
}
