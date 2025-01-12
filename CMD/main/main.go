package main

import(
	
	"log"
	"net/http"
	"github.com/gorilla/mux"
	_"github.com/jinzhu/gorm/dialects/mysql"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/routers"
)

func main(){
	r:=mux.NewRouter()
	routers.RegisterBookStoreRoutes(r)
	http.Handle("/",r)
	log.Fatal(http.ListenAndServe("localhost:8000",r))
}