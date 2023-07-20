package handlers

import (
	"fmt"
	dto "landtick-be/dto/result"
	ticketsdto "landtick-be/dto/ticket"
	"landtick-be/models"
	"landtick-be/repository"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepository repository.TicketRepository
}

func TicketHandler(ticketRepository repository.TicketRepository) *handlerTicket {
	return &handlerTicket{ticketRepository}
}

func (h *handlerTicket) FindTickets(c echo.Context) error {
	tickets, err := h.TicketRepository.FindTickets()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   tickets})
}

func (h *handlerTicket) GetTicket(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	ticket, err := h.TicketRepository.GetTicket(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   convertResponseTicket(ticket)})
}

func (h *handlerTicket) CreateTicket(c echo.Context) error {
	// request := new(ticketsdto.CreateTicketRequest)
	// if err := c.Bind(&request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{
	// 		Status:  "Success",
	// 		Message: err.Error()})
	// }

	startStationId, _ := strconv.Atoi(c.FormValue("start_station_id"))
	destinationStationId, _ := strconv.Atoi(c.FormValue("destination_station_id"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	qty, _ := strconv.Atoi(c.FormValue("qty"))

	request := models.Ticket{
		NameTrain:            c.FormValue("name_train"),
		TypeTrain:            c.FormValue("type_train"),
		StartDate:            c.FormValue("start_date"),
		StartStationID:       startStationId,
		StartTime:            c.FormValue("start_time"),
		DestinationStationID: destinationStationId,
		ArrivalTime:          c.FormValue("arrival_time"),
		Price:                price,
		Qty:                  qty,
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	data := models.Ticket{
		NameTrain:            request.NameTrain,
		TypeTrain:            request.TypeTrain,
		StartDate:            request.StartDate,
		StartStationID:       request.StartStationID,
		StartTime:            request.StartTime,
		DestinationStationID: request.DestinationStationID,
		ArrivalTime:          request.ArrivalTime,
		Price:                request.Price,
		Qty:                  request.Qty,
	}

	response, err := h.TicketRepository.CreateTicket(data)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   convertResponseCreateTicket(response)})
}

func (h *handlerTicket) FilterTickets(c echo.Context) error {
	startStationIDParam := c.QueryParam("start_station_id")
	destinationStationIDParam := c.QueryParam("destination_station_id")

	var startStationID int
	if startStationIDParam != "" {
		var err error
		startStationID, err = strconv.Atoi(startStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: "Invalid start_station_id"})
		}
	}

	fmt.Println(startStationID)

	var destinationStationID int
	if destinationStationIDParam != "" {
		var err error
		destinationStationID, err = strconv.Atoi(destinationStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: "Invalid destination_station_id"})
		}
	}

	fmt.Println(destinationStationID)

	ticket, err := h.TicketRepository.FilterTickets(startStationID, destinationStationID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "success", Data: ticket})
}

func convertResponseTicket(u models.Ticket) ticketsdto.TicketResponseDetail {
	return ticketsdto.TicketResponseDetail{
		ID:                   u.ID,
		NameTrain:            u.NameTrain,
		TypeTrain:            u.TypeTrain,
		StartDate:            u.StartDate,
		StartStationID:       u.StartStationID,
		StartStation:         u.StartStation,
		StartTime:            u.StartTime,
		DestinationStationID: u.DestinationStationID,
		DestinationStation:   u.DestinationStation,
		ArrivalTime:          u.ArrivalTime,
		Price:                u.Price,
		Qty:                  u.Qty,
	}
}

func convertResponseCreateTicket(u models.Ticket) ticketsdto.TicketResponseCreate {
	return ticketsdto.TicketResponseCreate{
		NameTrain:            u.NameTrain,
		TypeTrain:            u.TypeTrain,
		StartDate:            u.StartDate,
		StartStationID:       u.StartStationID,
		StartTime:            u.StartTime,
		DestinationStationID: u.DestinationStationID,
		ArrivalTime:          u.ArrivalTime,
		Price:                u.Price,
		Qty:                  u.Qty,
	}

}

// func convertResponseGetTicket(ticket []models.Ticket) []ticketsdto.TicketResponse {
// 	var ticketResponse []ticketsdto.TicketResponse

// 	for _, tickets = range ticket{
// 		ticketResponse = append(ticketResponse, )
// 	}
// }
