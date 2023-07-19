package profiledto

import "landtick-be/models"

type ProfileResponse struct {
	ID      int                 `json:"id"`
	Phone   string              `json:"phone"`
	Gender  string              `json:"gender"`
	Address string              `json:"address"`
	UserID  int                 `json:"user_id"`
	User    models.UserResponse `json:"user"`
}
