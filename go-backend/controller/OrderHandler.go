/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-08 14:14:22
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-08 18:35:22
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
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateOrder(c *gin.Context) {
	// 处理创建订单的逻辑
	// 这里可以使用 Stripe 或其他支付网关的 SDK 来处理订单创建请求
	// 例如，创建一个订单并返回给前端

	// 解析请求参数
	Claims, err := middleware.GetJwtClaims(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.Response{Code: 401, Message: "Unauthorized"})
		return
	}
	claimsData := Claims.ClaimsData.(map[string]interface{})
	jwtUserEmail := claimsData["Email"]
	log.Println(jwtUserEmail)

	//生成订单号
	OutTradeNo := uuid.New().String()

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
		PaidUser:    jwtUserEmail.(string),
		OutTradeNo:  OutTradeNo,
		Amount:      subscribe.Money,
		Count:       &countUint,
		PaidStatus:  "unpaid",
		SubscribeId: subscribe.Name,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to create order"})
		return
	}

	paymentParams := make(map[string]interface{})

	paymentParams["out_trade_no"] = OutTradeNo

	paymentParams["name"] = subscribe.Name
	paymentParams["count"] = countUint
	paymentParams["money"] = *subscribe.Money
	paymentUrl := MakePayment(paymentParams)

	if paymentUrl == "" {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to create order"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Order created successfully", Data: map[string]interface{}{"payment_url": paymentUrl}})
}
