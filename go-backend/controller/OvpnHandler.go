/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-07 23:31:03
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-10 14:35:27
 * @FilePath: \RocketVPN\go-backend\controller\OvpnHandler.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package controller

import (
	"go-backend/Var"
	"go-backend/middleware"
	"go-backend/models"
	"go-backend/utils"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func InsertOvpnFile(c *gin.Context) {
	// 处理插入 ovpn 文件的逻辑
	// 这里可以使用 GORM 或其他 ORM 来插入数据到数据库
	// 例如，创建一个新的 OvpnFile 实例并保存到数据库

	var ovpnFile models.OvpnFile

	// 假设你已经从请求中获取了 ovpn 文件的内容
	if err := c.ShouldBindJSON(&ovpnFile); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "Invalid request data"})
	}

	if err := utils.DB.Create(&ovpnFile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to insert ovpn file"})
		return
	}
	c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Ovpn file inserted successfully", Data: ovpnFile})
}

func GetOvpnFileList(c *gin.Context) {
	// 处理获取 ovpn 文件列表的逻辑
	// 这里可以使用 GORM 或其他 ORM 来查询数据库中的 ovpn 文件列表

	var ovpnFiles []models.OvpnFile

	if err := utils.DB.Find(&ovpnFiles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to get ovpn file list"})
		return
	}
	for i := range ovpnFiles {
		ovpnFiles[i].File = ""
	}
	c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Ovpn file list retrieved successfully", Data: ovpnFiles})
}

func GetOvpnFile(c *gin.Context) {
	id := c.Query("id")
	log.Println("id", id)
	var ovpnFile models.OvpnFile
	// 处理获取单个 ovpn 文件的逻辑
	// 这里可以使用 GORM 或其他 ORM 来查询数据库中的 ovpn 文件
	if err := utils.DB.Where("id = ?", id).First(&ovpnFile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "Failed to get ovpn file"})
		return
	}

	// 返回 ovpn 文件的内容
	c.JSON(http.StatusOK, models.Response{Code: 200, Message: "Ovpn file retrieved successfully", Data: ovpnFile})
}

func BalanceAuthMiddleware(c *gin.Context) {

	claims := &middleware.Claims{}
	var user models.User
	token, err := jwt.ParseWithClaims(c.GetHeader("Authorization"), claims, func(token *jwt.Token) (interface{}, error) {
		return utils.JwtKey, nil
	})

	// return token, claims, err

	// token, _, err := middleware.ValidToken(c.GetHeader("Authorization"))

	if err != nil || !token.Valid {
		c.AbortWithStatusJSON(http.StatusUnauthorized, models.Response{Code: 401, Message: Var.TOKEN_INVALID})
		return
	}

	claimsData := claims.ClaimsData.(map[string]interface{})
	if utils.DB.Model(&models.User{}).Where("Email = ?", claimsData["Email"]).First(&user).Error != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, models.Response{Code: 401, Message: Var.TOKEN_INVALID})
		return
	}
	if *user.Balance < 1 {
		c.AbortWithStatusJSON(http.StatusUnauthorized, models.Response{Code: 401, Message: "余额不足!"})
		return
	}
	log.Println(claims.ClaimsData)

	c.Next()
}
