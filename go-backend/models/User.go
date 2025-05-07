/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-04-24 19:32:02
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-07 15:23:06
 * @FilePath: \RocketVPN\go-backend\models\User.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */
/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-04-01 13:24:00
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-04-03 21:50:42
 * @FilePath: \NanoPress\go-backend\models\User.go
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */

package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID       string `json:"id" gorm:"type:char(36);primaryKey"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	gorm.Model
}

// BeforeCreate 在创建记录之前生成 UUID
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
