package repository

import (
	"landtick-be/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	// CreateUser(user models.User) (models.User, error)
	// UpdateUser(user models.User, ID int) (models.User, error)
	// DeleteUser(user models.User, ID int) (models.User, error)
}

type repository struct {
	db *gorm.DB
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	// err := r.db.Raw("SELECT * FROM users").Scan(&users).Error //Ini Pake GORM
	err := r.db.Find(&users).Error //Ini ORM

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Raw("SELECT * FROM users WHERE id = ?", ID).Scan(&user).Error // Ini Pake GORM
	// SELECT * FROM users WHERE id = 2

	return user, err
}
