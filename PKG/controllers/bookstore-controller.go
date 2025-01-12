package controllers

import(
	"fmt"
	"net/http"	
	"github.com/gorilla/mux"
	"strconv"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/utils"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/models"
	"encoding/json"
)
	 var data models.Book
	func CreateBook(w http.ResponseWriter, r *http.Request){
		 Book1 :=&models.Book{}
		utils.ParseBody(r,Book1)
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
		// res,_:=json.Marshal(models.UpdateBook(Id,*Book1))
		// w.Header().Set("Content-Type","application/json")
		// w.WriteHeader(http.StatusOK)
		// w.Write(res)
	}