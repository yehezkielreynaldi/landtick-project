package handlers

import (
	authdto "landtick-be/dto/auth"
	dto "landtick-be/dto/result"
	"landtick-be/repository"
	"log"
	"net/http"
	"time"

	"landtick-be/models"
	"landtick-be/pkg/bcrypt"
	jwtToken "landtick-be/pkg/jwt"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repository.AuthRepository
}

type DataUsr struct {
	User interface{} `json:"user"`
}

func HandlerAuth(AuthRepository repository.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdto.AuthRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	user := models.User{
		Fullname: request.Fullname,
		Username: request.Username,
		Email:    request.Email,
		Password: password,
		Gender:   request.Gender,
		Phone:    request.Phone,
		Address:  request.Address,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: DataUsr{User: data}})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	user := models.User{
		Username: request.Username,
		Password: request.Password,
	}

	// Check username
	user, err := h.AuthRepository.Login(user.Username)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Error",
			Message: "wrong username",
		})
	}

	// Check password
	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Error",
			Message: "wrong password",
		})
	}

	//generate token
	claims := jwt.MapClaims{} // inisialisasi
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 hours expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := authdto.LoginResponse{
		Fullname: user.Fullname,
		Username: user.Username,
		Email:    user.Email,
		Token:    token,
		Role:     user.Role,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   DataUsr{User: loginResponse},
	})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "success", Data: user})
}
