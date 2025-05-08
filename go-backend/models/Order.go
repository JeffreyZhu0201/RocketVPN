package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Order struct {
	ID         string `json:"id" gorm:"type:char(36);primaryKey"`
	OutTradeNo string `json:"out_trade_no"`
	PaidUser   string `json:"paid_user"`
	ItemId     string `json:"item_id"`
	gorm.Model
}

// BeforeCreate 在创建记录之前生成 UUID
func (u *Order) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	u.OutTradeNo = uuid.New().String()
	return
}
