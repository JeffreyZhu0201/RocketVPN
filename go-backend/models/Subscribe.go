package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Subscribe struct {
	ID      string   `json:"id" gorm:"type:char(36);primaryKey"`
	Name    string   `json:"name"`
	Balance *uint    `json:"balance"`
	Money   *float32 `json:"money"`
}

// BeforeCreate 在创建记录之前生成 UUID
func (u *Subscribe) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
