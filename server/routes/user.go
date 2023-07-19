package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	r := repository.RepositoryUser(mysql.DB)
	h := handlers.UserHandler(r)

	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", middleware.Auth(h.GetUser))
}
