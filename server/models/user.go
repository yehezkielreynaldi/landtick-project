package models

// User model struct
type User struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Username string `json:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Gender   string `json:"gender" form:"gender" gorm:"varchar(255)"`
	Phone    string `json:"no_hp" gorm:"type: varchar(255)"`
	Address  string `json:"address" form:"address"`
	Role     string `json:"role" form:"role" gorm:"default:'user'"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Username string `json:"username"`
}

type UserResponseTransaction struct {
	ID       int    `json:"id"`
	Fullname string `json:"name"`
	Email    string `json:"email"`
	Phone    string `json:"no_hp"`
}

type UserResponseTicket struct {
	ID       int    `json:"id"`
	Fullname string `json:"name"`
	Phone    string `json:"no_hp"`
	Email    string `json:"email"`
}

func (UserResponse) TableName() string {
	return "users"
}

func (UserResponseTransaction) TableName() string {
	return "users"
}

func (UserResponseTicket) TableName() string {
	return "users"
}
