package routers

import(
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/controllers"
	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(router *mux.Router){
	router.HandleFunc("/api/login",controllers.LoginHandler).Methods("POST")
	router.HandleFunc("/api/signup",controllers.SignupHandler).Methods("POST")
	router.HandleFunc("/api/verify",controllers.VerifyUser).Methods("POST")
}