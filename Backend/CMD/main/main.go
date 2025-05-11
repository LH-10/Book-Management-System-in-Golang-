package main

import(
	
	"log"
	"os"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	_"github.com/jinzhu/gorm/dialects/mysql"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/routers"    
	"github.com/joho/godotenv"
	// "fmt"
)

func main(){

	err:= godotenv.Load()

	if err!=nil{
		log.Fatal(err)
	}
	r:=mux.NewRouter()
	routers.RegisterBookStoreRoutes(r)
	routers.RegisterAuthRoutes(r)
	bookImageFolderPath:=os.Getenv("Book_Images_Path")
	files:=http.FileServer(http.Dir(bookImageFolderPath))
	r.Handle("/images/{files}",http.StripPrefix("/images/",files))
	http.Handle("/",r)
	allowedMethods:=handlers.AllowedMethods([]string{"GET","PUT","POST","DELETE","HEAD"})
	allowedOrigins:=handlers.AllowedOrigins([]string{"*"})
	log.Fatal(http.ListenAndServe(":8000",handlers.CORS(allowedOrigins,allowedMethods)(r)))
}