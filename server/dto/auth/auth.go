package authdto

type AuthRequest struct {
	Fullname string `json:"fullname" validate:"required" form:"fullname"`
	Username string `json:"username" validate:"required" form:"username"`
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Phone    string `json:"no_hp" validate:"required" form:"no_hp"`
	Address  string `json:"address" form:"address"`
}

type LoginRequest struct {
	Username string `json:"username" validate:"required" form:"username"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginResponse struct {
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"-"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}
