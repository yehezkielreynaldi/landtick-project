package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(e *echo.Group) {
	repo := repository.ProfileRepository(mysql.DB)
	h := handlers.ProfileHandler(repo)

	e.GET("/profile/:id", middleware.Auth(h.GetProfile))
}
