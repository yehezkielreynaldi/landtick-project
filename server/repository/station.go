package repository

import (
	"landtick-be/models"

	"gorm.io/gorm"
)

type StationRepository interface {
	FindStation() ([]models.Station, error)
	CreateStation(station models.Station) (models.Station, error)
}

func RepositoryStation(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindStation() ([]models.Station, error) {
	var stations []models.Station
	err := r.db.Raw("SELECT * FROM stations").Scan(&stations).Error //Ini Pake GORM
	// err := r.db.Find(&stations).Error //Ini ORM

	return stations, err
}

func (r *repository) CreateStation(stations models.Station) (models.Station, error) {
	err := r.db.Create(&stations).Error

	return stations, err
}
