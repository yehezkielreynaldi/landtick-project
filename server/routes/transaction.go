package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repository.RepositoryStation(mysql.DB)
	UserRepository := repository.RepositoryUser(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository, UserRepository)

	e.GET("/transactions", middleware.Auth(h.FindTransactions))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransaction))
	e.POST("/transaction", middleware.Auth(middleware.UploadFile(h.CreateTransaction)))
	e.POST("/create-trans/:id", middleware.Auth(h.CreateTransaction))
	e.DELETE("/transaction/:id", h.DeleteTransaction)
	e.GET("/order-user", middleware.Auth(h.GetTransByUser))
	e.GET("/get-idpayment/:id", middleware.Auth(h.GetIdPayment))
	e.GET("/payments/:id", h.PaymentTransaction)
	e.POST("/notification", h.Notification)

}
