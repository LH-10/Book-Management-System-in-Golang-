package routers

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/LH10/Book-Management-System-in-Golang-/PKG/controllers"
)

func RegisterBookStoreRoutes(router *mux.Router){

	router.HandleFunc("/book/",controllers.CreateBook).Methods("POST")
	router.HandleFunc("/book/",controllers.GetBooks).Methods("GET")
	router.HandleFunc("/book/{bookId}",controllers.GetBookById).Methods("GET")
	router.HandleFunc("/book/{bookId}",controllers.UpdateBook).Methods("PUT")
	router.HandleFunc("/book/{bookId}",controllers.DeleteBook).Methods("DELETE")
}