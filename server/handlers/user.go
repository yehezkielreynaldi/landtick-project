package handlers

import (
	dto "landtick-be/dto/result"
	usersdto "landtick-be/dto/user"
	"landtick-be/models"
	"landtick-be/repository"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handler struct {
	UserRepository repository.UserRepository
}

type DataUser struct {
	User interface{} `json:"user"`
}

func UserHandler(userRepository repository.UserRepository) *handler {
	return &handler{userRepository}
}

func (h *handler) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   DataUser{User: convertMultipleUserResponse(users)},
	})
}

func (h *handler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   convertResponse(user)})
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Fullname: u.Fullname,
		Username: u.Username,
		Email:    u.Email,
		// Password: u.Password,
	}
}

func convertMultipleUserResponse(users []models.User) []usersdto.UserResponse {
	var userResponse []usersdto.UserResponse

	for _, user := range users {
		userResponse = append(userResponse, convertResponse(user))
	}

	return userResponse
}
