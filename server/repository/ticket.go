package repository

import (
	"landtick-be/models"

	"gorm.io/gorm"
)

type TicketRepository interface {
	FindTickets() ([]models.Ticket, error)
	GetTicket(ID int) (models.Ticket, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	FilterTickets(date string, startStationID, destinationStationID int) ([]models.Ticket, error)
}

func RepositoryTicket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTickets() ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err
}

func (r *repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("StartStation").Preload("DestinationStation").Preload("User").First(&ticket, ID).Error

	return ticket, err
}

func (r *repository) CreateTicket(tickets models.Ticket) (models.Ticket, error) {
	err := r.db.Preload("StartStation").Preload("DestinationStation").Create(&tickets).Error

	return tickets, err
}

func (r repository) FilterTickets(StartDate string, StartStationID, DestinationStationID int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_date = ? AND start_station_id = ? AND destination_station_id = ?", StartDate, StartStationID, DestinationStationID).Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err

}
