/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-03-14 23:11:18
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-10 15:27:24
 * @FilePath: \RocketVPN\go-backend\middleware\jwt.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package middleware

import (
	"go-backend/Var"
	"go-backend/models"
	"go-backend/utils"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Claims struct {
	ClaimsData interface{}
	jwt.StandardClaims
}

func GenerateJWT(claims_data interface{}) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		ClaimsData: claims_data,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(utils.JwtKey)
}

func ValidToken(tokenString string) (*jwt.Token, *Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return utils.JwtKey, nil
	})
	return token, claims, err
}

func JWTAuthMiddleware(c *gin.Context) {

	token, _, err := ValidToken(c.GetHeader("Authorization"))

	if err != nil || !token.Valid {
		c.AbortWithStatusJSON(http.StatusUnauthorized, models.Response{Code: 401, Message: Var.TOKEN_INVALID})
		return
	}
	c.Next()
}

func GetJwtClaims(c *gin.Context) (*Claims, error) {
	token, claims, err := ValidToken(c.GetHeader("Authorization"))
	if err != nil || !token.Valid {
		return nil, err
	}
	return claims, nil
}
