/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-04-24 19:32:02
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-07 23:42:30
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
	ID       string `json:"ID" gorm:"type:char(36);primaryKey"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	Balance  *uint  `json:"balance"`
	gorm.Model
}

// BeforeCreate 在创建记录之前生成 UUID
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	u.Balance = new(uint)
	return
}
