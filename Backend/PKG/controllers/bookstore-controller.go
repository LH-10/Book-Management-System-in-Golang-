package controllers

import(
	"fmt"
	"net/http"	
	"github.com/gorilla/mux"
	"strconv"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/utils"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/models"
	"encoding/json"
	"log"
	"os"
	_"io"
	_"github.com/joho/godotenv"

)
	 var data models.Book
	func CreateBook(w http.ResponseWriter, r *http.Request){
		 Book1 :=&models.Book{}
		// utils.ParseBody(r,Book1)
		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode("Error parsing form")
			return
		}
		Jdata:=r.Form.Get("documentj")
		s, _ := strconv.Unquote(Jdata)

				fmt.Println(Jdata)
		fmt.Println(s)
		if err:=json.Unmarshal([]byte(Jdata),Book1);err!=nil{
			log.Printf("error occured")
			fmt.Println(err)
			return
		}
		var imageFolderPath string =os.Getenv("Book_Images_Path")
		 imagefilepath,err:=utils.FileUpload(r,imageFolderPath)
		 if err!=nil{
			log.Println(err)
			fmt.Fprintf(w,"error")
			return
		}
		Book1.ImagePath=imagefilepath
		res,_:=json.Marshal(Book1.CreateBook())
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func GetBooks(w http.ResponseWriter,r *http.Request){
		allbooks:=models.GetAllBooks()
		res , _ :=json.Marshal(allbooks)
		w.Header().Set("Content-type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func GetBookById(w http.ResponseWriter, r *http.Request){
		vars:=mux.Vars(r)
		bookId:=vars["bookId"]
		Id,err:=strconv.ParseInt(bookId,0,0)
		if err !=nil{
			fmt.Println("Error occured during conversion of string	")
		}
		thatBook,_:=models.GetBookById(Id)
		res , _ :=json.Marshal(thatBook)
		w.Header().Set("Content-type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func DeleteBook(w http.ResponseWriter,r *http.Request){
		vars:=mux.Vars(r)
		bookId:=vars["bookId"]
		Id,err:=strconv.ParseInt(bookId,0,0)
		if err!=nil{
			fmt.Println("Error occured while conversion")
		}
		
		thatBook:=models.DeleteBook(Id)
		res,_:=json.Marshal(thatBook)
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)

	}
	func UpdateBook(w http.ResponseWriter,r *http.Request){
		Book1 :=&models.Book{}
		utils.ParseBody(r,Book1)
		vars:=mux.Vars(r)
		bookId:=vars["bookId"]
		Id,err:=strconv.ParseInt(bookId,0,0)
		if err!=nil{
			fmt.Println("Error occured while conversion",Id)
		}
		res,_:=json.Marshal(models.UpdateBook(Id,*Book1))
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func ImageUpload(w http.ResponseWriter,r *http.Request){

		err := r.ParseMultipartForm(10 << 20)
    if err != nil {
        fmt.Println(err)
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode("Error parsing form")
        return
    }
		var imageFolderPath string =os.Getenv("Book_Images_Path")
		if _,err:=utils.FileUpload(r,imageFolderPath);err!=nil{
			log.Println(err)
			fmt.Fprintf(w,"error")
			return
		}
		// if err:=utils.FileUpload(r,"bookimages");err!=nil{
		// 	log.Println(err)
		// 	fmt.Fprintf(w,"error")
		// 	return
		// }
		fmt.Fprintf(w,"hello")
		}