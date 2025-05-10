/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-07 14:50:48
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-10 15:57:39
 * @FilePath: \RocketVPN\go-backend\controller\PaymentHandler.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package controller

import (
	"go-backend/utils"
	"log"
	"os"
	"strconv"
)

func MakePayment(paymentParams map[string]interface{}) string {
	// 处理支付请求的逻辑
	// 这里可以使用 Stripe 或其他支付网关的 SDK 来处理支付请求
	// 例如，创建一个支付意图并返回给前端
	pid, _ := strconv.Atoi(os.Getenv("PAY_PID"))
	paymentParams["pid"] = pid
	paymentParams["notify_url"] = os.Getenv("PAY_NOTIFY_URL")
	paymentParams["return_url"] = os.Getenv("PAY_RETURN_URL")
	paymentParams["sign_type"] = os.Getenv("PAY_SIGN_TYPE")

	//signStr.WriteString("&sign_type=MD5&sign=" + hex.EncodeToString(h.Sum(nil)))
	// anyParams := make(map[string]any)
	// for k, v := range paymentParams {
	// 	anyParams[k] = v
	// }
	signStr, _ := utils.SortMapAndSign(paymentParams)
	res, err := utils.Post(os.Getenv("PAY_URL") + "?" + signStr.String())
	log.Println(res)
	if err != nil {
		// 处理错误
		//c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to make payment"})
		return res
	}
	// c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Payment successful", Data: map[string]interface{}{"payment_url": res}})
	return res

}
