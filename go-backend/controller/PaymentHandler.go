/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-07 14:50:48
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-08 15:07:45
 * @FilePath: \RocketVPN\go-backend\controller\PaymentHandler.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package controller

import (
	"crypto/md5"
	"encoding/hex"
	"go-backend/utils"
	"os"
	"sort"
	"strings"
)

func MakePayment(paymentParams map[string]interface{}) string {
	// 处理支付请求的逻辑
	// 这里可以使用 Stripe 或其他支付网关的 SDK 来处理支付请求
	// 例如，创建一个支付意图并返回给前端

	paymentParams["pid"] = os.Getenv("PAY_PID")
	paymentParams["notify_url"] = os.Getenv("NOTIFY_URL")
	paymentParams["sign_type"] = os.Getenv("SIGN_TYPE")

	// 创建一个新的map来存储需要签名的参数
	signParams := make(map[string]string)

	// 复制需要签名的参数（排除sign、sign_type和空值）
	for k, v := range paymentParams {
		if k != "sign" && k != "sign_type" && v != "" {
			signParams[k] = v.(string)
		}
	}

	// 按ASCII码排序参数名
	var keys []string
	for k := range signParams {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	// 拼接参数
	var signStr strings.Builder
	for i, k := range keys {
		if i > 0 {
			signStr.WriteString("&")
		}
		signStr.WriteString(k)
		signStr.WriteString("=")
		signStr.WriteString(signParams[k])
	}

	// 添加商户密钥并计算MD5
	finalStr := signStr.String() + os.Getenv("PRIVATE_KEY")
	h := md5.New()
	h.Write([]byte(finalStr))
	paymentParams["sign"] = hex.EncodeToString(h.Sum(nil))

	// anyParams := make(map[string]any)
	// for k, v := range paymentParams {
	// 	anyParams[k] = v
	// }
	res, err := utils.FetchPost(os.Getenv("PAY_URL"), paymentParams)
	if err != nil {
		// 处理错误
		//c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to make payment"})
		return ""
	}
	// c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Payment successful", Data: map[string]interface{}{"payment_url": res}})
	return res

}
