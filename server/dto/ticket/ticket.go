package ticketsdto

import "landtick-be/models"

type CreateTicketRequest struct {
	// ID                   int    `json:"id"`
	NameTrain            string                    `json:"name_train" form:"name_train" validate:"required"`
	TypeTrain            string                    `json:"type_train" form:"type_train" validate:"required"`
	StartDate            string                    `json:"start_date" form:"start_date" validate:"required"`
	StartStationID       int                       `json:"start_station_id" form:"start_station_id" validate:"required"`
	StartTime            string                    `json:"start_time" form:"start_time" validate:"required"`
	DestinationStationID int                       `json:"destination_station_id" form:"destination_station_id" validate:"required"`
	ArrivalTime          string                    `json:"arrival_time" form:"arrival_time" validate:"required"`
	Price                int                       `json:"price" form:"price" validate:"required"`
	Qty                  int                       `json:"qty" form:"qty" validate:"required"`
	UserID               int                       `json:"user_id"`
	User                 models.UserResponseTicket `json:"-"`
}

type TicketResponse struct {
	ID                   int                    `json:"id"`
	NameTrain            string                 `json:"name_train"`
	TypeTrain            string                 `json:"type_train"`
	StartDate            string                 `json:"start_date"`
	StartStationID       int                    `json:"start_station_id"`
	StartStation         models.StationResponse `json:"start_station"`
	StartTime            string                 `json:"start_time"`
	DestinationStationID int                    `json:"destination_station_id"`
	DestinationStation   models.StationResponse `json:"destination_station"`
	ArrivalTime          string                 `json:"arrival_time"`
	Price                int                    `json:"price"`
	Qty                  int                    `json:"-"`
}

type TicketResponseCreate struct {
	NameTrain            string                    `json:"name_train"`
	TypeTrain            string                    `json:"type_train"`
	StartDate            string                    `json:"start_date"`
	StartStationID       int                       `json:"start_station_id"`
	StartTime            string                    `json:"start_time"`
	DestinationStationID int                       `json:"destination_station_id"`
	ArrivalTime          string                    `json:"arrival_time"`
	Price                int                       `json:"price"`
	Qty                  int                       `json:"qty"`
	UserID               int                       `json:"-"`
	User                 models.UserResponseTicket `json:"-"`
}

type TicketResponseDetail struct {
	ID                   int                       `json:"id"`
	NameTrain            string                    `json:"name_train"`
	TypeTrain            string                    `json:"type_train"`
	StartDate            string                    `json:"start_date"`
	StartStationID       int                       `json:"start_station_id"`
	StartStation         models.StationResponse    `json:"start_station"`
	StartTime            string                    `json:"start_time"`
	DestinationStationID int                       `json:"destination_station_id"`
	DestinationStation   models.StationResponse    `json:"destination_station"`
	ArrivalTime          string                    `json:"arrival_time"`
	Price                int                       `json:"price"`
	Qty                  int                       `json:"-"`
	UserID               int                       `json:"-"`
	User                 models.UserResponseTicket `json:"user"`
}
