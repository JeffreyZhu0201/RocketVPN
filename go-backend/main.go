/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-04-24 19:32:55
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-04-24 19:32:55
 * @FilePath: \RocketVPN\go-backend\main.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */

package main

import (
	"fmt"
	"go-backend/models"
	"go-backend/routes"
	"go-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	// Initialize the database connection
	utils.InitDB()

	r := gin.Default()
	routes.SetupRoutes(r)
	// 解决cors跨域
	//配置gin允许跨域请求
	r.Use(models.Cors())

	if err := r.Run(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	} else {
		fmt.Println("Server started on port 8080")
	}
}
