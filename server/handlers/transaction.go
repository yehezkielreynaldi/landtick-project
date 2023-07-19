package handlers

import (
	"fmt"
	resultdto "landtick-be/dto/result"
	transactiondto "landtick-be/dto/transaction"
	"landtick-be/models"
	"landtick-be/repository"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	// "github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

var path_file = "http://localhost:5000/uploads/"

type handlerTransaction struct {
	TransactionRepository repository.TransactionRepository
	UserRepository        repository.UserRepository
}

type dataTrsansaction struct {
	Transaction interface{} `json:"transaction"`
}

func HandlerTransaction(TransactionRepository repository.TransactionRepository, UserRepository repository.UserRepository) *handlerTransaction {
	return &handlerTransaction{
		TransactionRepository: TransactionRepository,
		UserRepository:        UserRepository}
}

func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	response := make([]transactiondto.TransactionResponse, len(transactions))
	for i, u := range transactions {
		response[i] = convertResponseTransactionFindAll(u)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataTrsansaction{
			Transaction: response,
		},
	})
}
func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data: dataTrsansaction{
			Transaction: convertResponseTransactionGet(transaction),
		},
	})
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	request := new(transactiondto.CreateTransactionRequest)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "error1 :" + err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	ticket, err := h.TransactionRepository.GetTicketById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "error2 :" + err.Error()})
	}

	TransactionIdIsExist := false
	var TransactionId int
	for !TransactionIdIsExist {
		TransactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {

			TransactionIdIsExist = true
		}
	}
	subTotal := ticket.Price * 1

	transaction := models.Transaction{
		ID:       TransactionId,
		TicketID: ticket.ID,
		Total:    subTotal,
		UserID:   userId,
		Qty:      1,
		Status:   request.Status,
	}

	newTransaction, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: "error3 :" + err.Error()})
	}

	dataTransaction, err := h.TransactionRepository.GetTransaction(newTransaction.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: "error4 :" + err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: dataTransaction})
}

// UserID, _ := strconv.Atoi(c.FormValue("user_id"))

// TicketID, _ := strconv.Atoi(c.FormValue("ticket_id"))
// Image := c.Get("dataFile").(string)

// request.UserID = UserID
// request.TicketID = TicketID
// request.Image = Image

// validation := validator.New()

// validationErr := validation.Struct(request)
// if validationErr != nil {
// 	return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Error", Message: validationErr.Error()})
// }

// newTransaction := models.Transaction{
// 	UserID:   request.UserID,
// 	TicketID: request.TicketID,
// 	Image:    request.Image,
// }

// data, err := h.TransactionRepository.CreateTransaction(newTransaction)
// if err != nil {
// 	return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Error", Message: err.Error()})
// }

// return c.JSON(http.StatusOK, resultdto.SuccessResult{
// 	Status: "Success",
// 	Data: dataTrsansaction{
// 		Transaction: data,
// 	},
// })

// UserID, _ := strconv.Atoi(c.FormValue("user_id"))
// TicketID, _ := strconv.Atoi(c.FormValue("ticket_id"))
// Image := c.Get("dataFile").(string)

// request.UserID = UserID
// request.TicketID = TicketID
// request.Image = Image

// validation := validator.New()

// validationErr := validation.Struct(request)
// if validationErr != nil {
// 	return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Error", Message: validationErr.Error()})
// }

// newTransaction := models.Transaction{
// 	UserID:   request.UserID,
// 	TicketID: request.TicketID,
// 	Image:    request.Image,
// }

// data, err := h.TransactionRepository.CreateTransaction(newTransaction)
// if err != nil {
// 	return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Error", Message: err.Error()})
// }

// return c.JSON(http.StatusOK, resultdto.SuccessResult{
// 	Status: "Success",
// 	Data: dataTrsansaction{
// 		Transaction: data,
// 	},
// })

func (h *handlerTransaction) GetTransByUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	transaction, err := h.TransactionRepository.GetTicketTransaction(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	var responseTransaction []transactiondto.TransactionResponse
	for _, t := range transaction {
		responseTransaction = append(responseTransaction, convertResponseTransaction(t))
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: responseTransaction})
}

func (h *handlerTransaction) GetIdPayment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: transaction})
}

func (h *handlerTransaction) PaymentTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	payment, err := h.TransactionRepository.GetPaymentByIdTrans(id)
	fmt.Println(payment)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(payment.ID),
			GrossAmt: int64(payment.Total),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: payment.User.Fullname,
			Email: payment.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: snapResp})
}

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderId)

	fmt.Print("payload: ", notificationPayload)

	transaction, _ := h.TransactionRepository.GetTransaction(order_id)
	user, _ := h.UserRepository.GetUser(order_id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", order_id)
		} else if fraudStatus == "accept" {
			SendMail("success", transaction, user)
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		SendMail("success", transaction, user)
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction, user models.User) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "dumbflix <yehezkielreynaldi01@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var Quantity = strconv.Itoa(transaction.Qty)
		var Total = strconv.Itoa(transaction.Total)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", "reynaldiabrahamyehezkiel@gmail.com")
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		h1 {
		color: brown;
		}
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		<li>Total Quantity : %s</li>
		<li>Total payment: Rp.%s</li>
		<li>Status : <b>%s</b></li>
		</ul>
		</body>
	</html>`, Quantity, Total, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + CONFIG_AUTH_EMAIL)
	}
}

func (h *handlerTransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: data})
}

func convertResponseTransactionFindAll(u models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		ID:     u.ID,
		User:   convertUser(u.User),
		Ticket: convertTicket(u.Ticket),
		Image:  path_file + u.Image,
		Status: u.Status,
	}
}
func convertResponseTransactionGet(u models.Transaction) transactiondto.TransactionIdResponse {
	return transactiondto.TransactionIdResponse{
		ID:     u.ID,
		User:   convertUser(u.User),
		Ticket: convertTicket(u.Ticket),
		Image:  path_file + u.Image,
		Status: u.Status,
	}
}

func convertTicket(u models.TicketResponse) models.TicketResponse {
	return models.TicketResponse{
		ID:                   u.ID,
		NameTrain:            u.NameTrain,
		TypeTrain:            u.TypeTrain,
		StartDate:            u.StartDate,
		StartStationID:       u.StartStationID,
		StartStation:         convertStation(u.StartStation),
		StartTime:            u.StartTime,
		DestinationStationID: u.DestinationStationID,
		DestinationStation:   convertStation(u.DestinationStation),
		ArrivalTime:          u.ArrivalTime,
		Price:                u.Price,
	}
}

func convertStation(s models.StationResponse) models.StationResponse {
	return models.StationResponse{
		Id:   s.Id,
		Name: s.Name,
		Kota: s.Kota,
	}
}

func convertUser(u models.UserResponseTransaction) models.UserResponseTransaction {
	return models.UserResponseTransaction{
		ID:       u.ID,
		Fullname: u.Fullname,
		Email:    u.Email,
		Phone:    u.Phone,
	}
}

func convertResponseTransaction(t models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		ID:            t.ID,
		TransactionID: t.TransactionID,
		UserID:        t.UserID,
		User:          t.User,
		TicketID:      t.TicketID,
		Ticket:        t.Ticket,
		Status:        t.Status,
	}
}
