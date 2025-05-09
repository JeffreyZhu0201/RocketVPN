package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Order struct {
	ID          string   `json:"id" gorm:"primaryKey"`
	OutTradeNo  string   `json:"out_trade_no" gorm:"unique;char(36)"`
	PaidUser    string   `json:"paid_user"`
	SubscribeId string   `json:"subscribe_id"`
	PaidStatus  string   `json:"paid_status"`
	Amount      *float32 `json:"amount"`
	Count       *uint    `json:"count"`
	gorm.Model
}

// BeforeCreate 在创建记录之前生成 UUID
func (u *Order) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
