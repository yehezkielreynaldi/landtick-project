package handlers

import (
	dto "landtick-be/dto/result"
	stationdto "landtick-be/dto/station"
	"landtick-be/models"
	"landtick-be/repository"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerStation struct {
	StationRepository repository.StationRepository
}

type DataStation struct {
	Stations interface{} `json:"stations"`
}

func HandlerStation(stationRepository repository.StationRepository) *handlerStation {
	return &handlerStation{stationRepository}
}

func (h *handlerStation) FindStation(c echo.Context) error {
	stations, err := h.StationRepository.FindStation()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   DataStation{Stations: stations},
	})
}

func (h *handlerStation) CreateStation(c echo.Context) error {
	request := new(stationdto.CreateStationRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	data := models.Station{
		Name: request.Name,
		Kota: request.Kota,
	}

	response, err := h.StationRepository.CreateStation(data)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   response})
}
