package handlers

import (
	profiledto "landtick-be/dto/profile"
	dto "landtick-be/dto/result"
	"landtick-be/models"
	"landtick-be/repository"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handlerProfile struct {
	Profile repository.Profile
}

func ProfileHandler(profile repository.Profile) *handlerProfile {
	return &handlerProfile{profile}
}

func (h *handlerProfile) GetProfile(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var profile models.Profile
	profile, err := h.Profile.GetProfile(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: convertResponseProfile(profile)})
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:      u.ID,
		Phone:   u.Phone,
		Gender:  u.Gender,
		Address: u.Address,
		UserID:  u.UserID,
		User:    u.User,
	}
}
