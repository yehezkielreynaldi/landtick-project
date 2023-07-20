package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	r := repository.RepositoryTicket(mysql.DB)
	h := handlers.TicketHandler(r)

	e.GET("/tickets", h.FindTickets)
	e.GET("/ticket/:id", h.GetTicket)
	e.POST("/ticket", middleware.Auth(h.CreateTicket))
	e.GET("/filter-ticket", h.FilterTickets)
}
