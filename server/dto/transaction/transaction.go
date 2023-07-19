package transactiondto

import (
	ticketdto "landtick-be/dto/ticket"
	"landtick-be/models"
)

type CreateTransactionRequest struct {
	UserID   int    `json:"user_id" form:"user_id"`
	TicketID int    `json:"ticket_id" form:"ticket_id"`
	Total    int    `json:"total"`
	Qty      int    `json:"qty"`
	Status   string `json:"status"`
	Image    string `json:"image" form:"image"`
}

type UpdateTransactionRequest struct {
	UserID   int    `json:"user_id" form:"user_id"`
	TicketID int    `json:"ticket_id" form:"ticket_id"`
	Total    int    `json:"total"`
	Qty      int    `json:"qty"`
	Status   string `json:"status"`
	Image    string `json:"image" form:"image"`
}

type TransactionResponse struct {
	ID            int                            `json:"id" gorm:"primary_key:auto_increment"`
	TransactionID int                            `json:"transaction_id"`
	UserID        int                            `json:"user_id"`
	User          models.UserResponseTransaction `json:"user"`
	TicketID      int                            `json:"ticket_id"`
	Ticket        models.TicketResponse          `json:"ticket"`
	Image         string                         `json:"image" form:"image"`
	Status        string                         `json:"status" form:"status"`
}

type TransactionIdResponse struct {
	ID     int                            `json:"id"`
	User   models.UserResponseTransaction `json:"user"`
	Ticket models.TicketResponse          `json:"ticket"`
	Image  string                         `json:"image" form:"image"`
	Status string                         `json:"status" form:"status"`
}
type TransactionTicketResponse struct {
	ID     int                      `json:"-"`
	Ticket ticketdto.TicketResponse `json:"ticket"`
	User   models.UserResponse      `json:"user"`
}
