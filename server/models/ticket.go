package models

// User model struct
type Ticket struct {
	ID                   int             `json:"id" gorm:"primaryKey:autoIncrement"`
	NameTrain            string          `json:"name_train" gorm:"type: varchar(255)"`
	TypeTrain            string          `json:"type_train" gorm:"type: varchar(255)"`
	StartDate            string          `json:"start_date" gorm:"type: varchar(255)"`
	StartStationID       int             `json:"start_station_id"`
	StartStation         StationResponse `json:"start_station" gorm:"foreignKey:StartStationID"`
	StartTime            string          `json:"start_time" gorm:"type: varchar(255)"`
	DestinationStationID int             `json:"destination_station_id"`
	DestinationStation   StationResponse `json:"destination_station" gorm:"foreignKey:DestinationStationID"`
	ArrivalTime          string          `json:"arrival_time" gorm:"type: varchar(255)"`
	Price                int             `json:"price" gorm:"type: int"`
	Qty                  int             `json:"qty" gorm:"type:int"`
	// UserID               int                `json:"-"`
	// User                 UserResponseTicket `json:"-"`
}

type TicketResponse struct {
	ID                   int             `json:"id"`
	NameTrain            string          `json:"name_train" validate:"required"`
	TypeTrain            string          `json:"type_train" validate:"required"`
	StartDate            string          `json:"start_date" validate:"required"`
	StartStationID       int             `json:"-"`
	StartStation         StationResponse `json:"start_station"`
	StartTime            string          `json:"start_time" validate:"required"`
	DestinationStationID int             `json:"-" `
	DestinationStation   StationResponse `json:"destination_station"`
	ArrivalTime          string          `json:"arrival_time" validate:"required"`
	Price                int             `json:"price" validate:"required"`
	UserID               int             `json:"-"`
}

func (TicketResponse) TableName() string {
	return "tickets"
}
