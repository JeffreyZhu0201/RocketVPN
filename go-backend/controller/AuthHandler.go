/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-04-24 19:31:14
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-08 14:33:39
 * @FilePath: \RocketVPN\go-backend\controller\AuthHandler.go
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
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(c *gin.Context) {
	var user models.User

	// 用户注册请求体绑定
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: Var.SYSTEM_UNPROCESSABLE_ENTITY})
		return
	}

	// 查询是否已存在用户
	var existingUser models.User
	if err := utils.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: Var.USER_EXIST})
		return
	}

	//加密密码
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 500, Message: Var.PASSWORD_HASHING_FAILED})
		return
	}
	// 注册用户
	user.Password = string(hashedPassword)
	// 创建用户
	if err := utils.DB.Model(&models.User{}).Create(&user).First(&user).Error; err != nil {
		//注册失败
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: Var.USER_REGISTER_FAIL})
		return
	}
	// 登录，生成JWT令牌
	token, err := middleware.GenerateJWT(map[string]interface{}{"id": user.ID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: Var.SYSTEM_ERROR})
		return
	}
	c.JSON(http.StatusOK, models.Response{Code: 200, Message: Var.USER_REGISTER_SUCCESS, Data: map[string]interface{}{"token": token}})
}

func LoginHandler(c *gin.Context) {
	var user models.User

	// 用户登录请求体绑定
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: Var.SYSTEM_UNPROCESSABLE_ENTITY})
		return
	}

	// 查询用户
	var existingUser models.User
	if err := utils.DB.Where("email = ?", user.Email).First(&existingUser).Error; err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: Var.USER_NOT_EXIST})
		return
	}

	// 验证密码
	if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: Var.USER_PASSWORD_INCORRECT})
		return
	}

	// 生成JWT令牌
	token, err := middleware.GenerateJWT(map[string]interface{}{"id": existingUser.ID})

	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: Var.SYSTEM_ERROR})
		return
	}

	c.JSON(http.StatusOK, models.Response{Code: 200, Message: Var.USER_LOGIN_SUCCESS, Data: map[string]interface{}{"token": token}})
}
