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

func init(){
	err:=godotenv.Load()
	if err!=nil{
		log.Fatal(err)
	}
}

func main(){

	r:=mux.NewRouter()
	routers.RegisterBookStoreRoutes(r)
	routers.RegisterAuthRoutes(r)
	bookImageFolderPath:=os.Getenv("Book_Images_Path")
	files:=http.FileServer(http.Dir(bookImageFolderPath))
	r.Handle("/images/{files}",http.StripPrefix("/images/",files))
	http.Handle("/",r)
	allowedMethods:=handlers.AllowedMethods([]string{"GET","PUT","POST","DELETE","HEAD"})
	allowedOrigins:=handlers.AllowedOrigins([]string{"*"})
	allowedHeaders :=handlers.AllowedHeaders([]string{"Content-Type", "Authorization", "X-Requested-With"})
	log.Fatal(http.ListenAndServe(":8000",handlers.CORS(allowedOrigins,allowedMethods,allowedHeaders)(r)))

}