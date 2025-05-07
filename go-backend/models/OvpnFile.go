package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type OvpnFile struct {
	gorm.Model
	ID       string `json:"id" gorm:"type:char(36);primaryKey"`
	FileName string `json:"file_name"`
	File     string `json:"file"`
}

// BeforeCreate 在创建记录之前生成 UUID
func (u *OvpnFile) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
