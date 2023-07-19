package stationdto

type CreateStationRequest struct {
	Kota string `json:"kota" form:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}

type StationResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Kota string `json:"kota"`
}
