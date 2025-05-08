/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-08 15:11:58
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-08 18:22:47
 * @FilePath: \RocketVPN\go-backend\controller\SubscribeHandler.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
package controller

import (
	"go-backend/models"
	"go-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateSubscribe(c *gin.Context) {
	var subscribe models.Subscribe

	// 绑定请求体
	if err := c.ShouldBindJSON(&subscribe); err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "系统无法处理请求"})
		return
	}

	// 查询是否已存在订阅
	var existingSubscribe models.Subscribe
	if err := utils.DB.Where("name = ?", subscribe.Name).First(&existingSubscribe).Error; err == nil {
		c.JSON(http.StatusBadRequest, models.Response{Code: 400, Message: "订阅已存在"})
		return
	}

	// 创建订阅
	if err := utils.DB.Create(&subscribe).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{Code: 500, Message: "订阅创建失败"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Code: 200, Message: "订阅创建成功", Data: subscribe})
}
