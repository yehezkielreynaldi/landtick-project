package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func StationRoutes(e *echo.Group) {
	r := repository.RepositoryStation(mysql.DB)
	h := handlers.HandlerStation(r)

	e.GET("/stations", middleware.Auth(h.FindStation))
	e.POST("/station", middleware.Auth(h.CreateStation))
}
