/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-04-01 13:31:46
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-04-21 22:58:25
 * @FilePath: \NanoPress\go-backend\routes\routes.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */

package routes

import (
	"go-backend/controller"
	"go-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/register", controller.RegisterHandler)
		auth.POST("/login", controller.LoginHandler)
	}

	r.GET("/", middleware.JWTAuthMiddleware, func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Welcome to the API!",
		})
	})

	order := r.Group("/order")
	{
		order.POST("/create", middleware.JWTAuthMiddleware, controller.CreateOrder)
	}

	ovpnFiles := r.Group("/ovpn")
	{
		ovpnFiles.GET("/getall", controller.GetOvpnFileList)
		ovpnFiles.GET("/getbyid", controller.BalanceAuthMiddleware, controller.GetOvpnFile)
		ovpnFiles.POST("/insert", controller.InsertOvpnFile)
	}

	subscribe := r.Group("/subscribe")
	{
		subscribe.POST("/create", controller.CreateSubscribe)
	}

	r.GET("/notify", controller.Notify)

}
