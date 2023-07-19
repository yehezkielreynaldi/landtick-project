package models

// Station model struct
type Station struct {
	ID   int    `json:"id" gorm:"primaryKey:autoIncrement"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name" gorm:"type: varchar(255)"`
}

type StationResponse struct {
	Id   int    `json:"id"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name"`
}

func (Station) TableName() string {
	return "station"
}

func (StationResponse) TableName() string {
	return "stations"
}
