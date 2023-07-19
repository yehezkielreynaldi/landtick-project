package models

type Transaction struct {
	ID            int                     `json:"id" gorm:"primaryKey"`
	TransactionID int                     `json:"transaction_id"`
	UserID        int                     `json:"user_id" form:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User          UserResponseTransaction `json:"user" gorm:"foreignKey:UserID"`
	TicketID      int                     `json:"ticket_id" form:"ticket_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Ticket        TicketResponse          `json:"ticket" gorm:"foreignKey:TicketID"`
	Total         int                     `json:"total" form:"total"`
	Qty           int                     `json:"qty" form:"qty"`
	Image         string                  `json:"image" form:"image"`
	Status        string                  `json:"status" form:"status" gorm:"default:'pending'"`
}

type TransactionResponse struct {
	UserID   int                     `json:"user_id" form:"user_id"`
	User     UserResponseTransaction `json:"user" gorm:"foreignKey:UserID"`
	TicketID int                     `json:"ticket_id" form:"ticket_id"`
	Ticket   TicketResponse          `json:"ticket"`
	Image    string                  `json:"image" form:"image"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}

// func (MyTicketTransaction) TableName() string {
// 	return "transactions"
// }
