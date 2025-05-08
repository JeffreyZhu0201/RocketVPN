/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-07 14:50:48
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-08 14:12:45
 * @FilePath: \RocketVPN\go-backend\controller\PaymentHandler.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package controller

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"go-backend/Var"
	"go-backend/middleware"
	"go-backend/models"
	"go-backend/utils"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func MakePayment(c *gin.Context) {
	// 处理支付请求的逻辑
	// 这里可以使用 Stripe 或其他支付网关的 SDK 来处理支付请求
	// 例如，创建一个支付意图并返回给前端

	paymentPrams := make(map[string]string)

	paymentPrams["pid"] = os.Getenv("PAY_PID")
	paymentPrams["out_trade_no"] = uuid.New().String()
	paymentPrams["notify_url"] = os.Getenv("NOTIFY_URL")
	paymentPrams["name"] = c.Query("name")
	paymentPrams["money"] = c.Query("money")
	paymentPrams["clientip"] = c.Query("clientip")
	paymentPrams["timestamp"] = strconv.FormatInt(time.Now().Unix(), 10)
	paymentPrams["sign_type"] = os.Getenv("SIGN_TYPE")

	// Step 1: Sort parameters excluding sign and sign_type
	var paramKeys []string
	for k, v := range paymentPrams {
		if k != "sign" && k != "sign_type" && v != "" {
			paramKeys = append(paramKeys, k)
		}
	}
	sort.Strings(paramKeys)

	// Step 2: Build query string
	var queryParts []string
	for _, k := range paramKeys {
		queryParts = append(queryParts, k+"="+paymentPrams[k])
	}
	signStr := strings.Join(queryParts, "&")

	// Step 3: Generate RSA signature
	privateKey, err := utils.LoadPrivateKeyFromPEM(os.Getenv("PRIVATE_KEY"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load private key"})
		return
	}

	h := sha256.New()
	h.Write([]byte(signStr))
	hashed := h.Sum(nil)

	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, hashed)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate signature"})
		return
	}

	paymentPrams["sign"] = base64.StdEncoding.EncodeToString(signature)

	c.JSON(http.StatusOK, gin.H{"message": "Payment successful"})
}

func BalanceAuthMiddleware(c *gin.Context) {

	claims := &middleware.Claims{}
	token, err := jwt.ParseWithClaims(c.GetHeader("Authorization"), claims, func(token *jwt.Token) (interface{}, error) {
		return utils.JwtKey, nil
	})

	// return token, claims, err

	// token, _, err := middleware.ValidToken(c.GetHeader("Authorization"))

	if err != nil || !token.Valid {
		c.AbortWithStatusJSON(http.StatusUnauthorized, models.Response{Code: 401, Message: Var.TOKEN_INVALID})
		return
	}

	log.Println(claims.ClaimsData.(*models.User))

	c.Next()
}
