package controllers

import(
	"fmt"
	"net/http"	
	"github.com/gorilla/mux"
	"strconv"
	"github.com/LH10/Book-Management-System-in-Golang-/PKG/utils"
	"github.com/LH10/Book-Management-System-in-Golang-/PKG/models"
	"github.com/LH10/Book-Management-System-in-Golang-/PKG/config"
	"github.com/jinzhu/gorm"
	"encoding/json"
)
	 var data models.Book
	func CreateBook(w http.ResponseWriter, r *http.Request){
		data=utils.ParseBody(r)
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
	}