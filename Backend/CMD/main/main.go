package main

import(
	
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	_"github.com/jinzhu/gorm/dialects/mysql"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/routers"
)

func main(){
	r:=mux.NewRouter()
	routers.RegisterBookStoreRoutes(r)
	http.Handle("/",r)
	allowedMethods:=handlers.AllowedMethods([]string{"GET","PUT","POST","DELETE","HEAD"})
	allowedOrigins:=handlers.AllowedOrigins([]string{"*"})
	log.Fatal(http.ListenAndServe(":8000",handlers.CORS(allowedOrigins,allowedMethods)(r)))
}