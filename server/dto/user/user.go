package usersdto

type CreateUserRequest struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	// Password string `json:"password" form:"password" validate:"required"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password"`
	Gender   string `json:"-"`
	Phone    string `json:"-"`
	Address  string `json:"-"`
	Role     string `json:"role"`
	// Profile  models.ProfileResponse `json:"profile"`
	// Password string `json:"password" form:"password" validate:"required"`
}
