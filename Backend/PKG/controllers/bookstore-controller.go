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
	"sync"
	"os"
	"strings"
	_"io"
	_"github.com/joho/godotenv"

)
var data models.Book
func CreateBook(w http.ResponseWriter, r *http.Request){
	Book1 :=&models.Book{}
	
	var wg sync.WaitGroup
	errorChannel:=make(chan error,1)
	var imagefilepath string
	var res []byte

	useremail,err:=utils.VerifyUser(r)
	log.Println(useremail)
	if err!=nil{
		log.Println(err,err.Error())
			http.Error(w,"You are not logged in!",http.StatusBadRequest)
			return
	}
		newUser:=&models.User{}
		wg.Add(1)

		go func(){
			defer wg.Done()
			models.GetUserColumns(useremail,[]string{"storename"} ,newUser)
		}()
		
		err = r.ParseMultipartForm(10 << 20)
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
		
		imageUpload:=func(){
			defer wg.Done()
			imagefilepath,err=utils.FileUpload(r,imageFolderPath)
			if err!=nil{
				log.Println(err)
				fmt.Fprintf(w,"error")
				errorChannel<-err
				return
			}
			errorChannel<-nil
			imagefilepath=strings.Replace(imagefilepath,os.Getenv("Book_Images_Path"),os.Getenv("Book_Image_URL_For_Client"),1)
		}
		
		bookEntry:=func(){
			Book1.ImagePath=imagefilepath
			Book1.Storename=newUser.Storename
			res,_=json.Marshal(Book1.CreateBook())
		}
		wg.Add(1)
		go imageUpload()
		
		wg.Wait()
		if err:=<-errorChannel;err!=nil{
			return
		}
		
		bookEntry()
		
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func GetBooks(w http.ResponseWriter,r *http.Request){
		useremail,err:=utils.VerifyUser(r)
		log.Println(useremail)
		if err!=nil{
			log.Println(err,err.Error())
			http.Error(w,"You are not logged in!",http.StatusBadRequest)

			return
		}
		newUser:=&models.User{}
		models.GetUserColumns(useremail,[]string{"storename"} ,newUser)
		allbooks:=models.GetAllBooks(newUser.Storename)
		res , _ :=json.Marshal(allbooks)
		w.Header().Set("Content-type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func GetBookById(w http.ResponseWriter, r *http.Request){
		useremail,err:=utils.VerifyUser(r)
		log.Println(useremail)
		if err!=nil{
			log.Println(err,err.Error())
			http.Error(w,"You are not logged in!",http.StatusBadRequest)
			
			return
		}
		newUser:=&models.User{}
		models.GetUserColumns(useremail,[]string{"storename"} ,newUser)
		vars:=mux.Vars(r)
		bookId:=vars["bookId"]
		Id,err:=strconv.ParseInt(bookId,0,0)
		if err !=nil{
			fmt.Println("Error occured during conversion of string	")
			http.Error(w,"Error while reading data",http.StatusBadRequest)

			return
		}
		thatBook,_:=models.GetBookById(Id)
		if thatBook.Storename != newUser.Storename{
			http.Error(w, "You are not allowed to access this",http.StatusBadRequest)

			return
		}
		res , _ :=json.Marshal(thatBook)
		w.Header().Set("Content-type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}

	func DeleteBook(w http.ResponseWriter,r *http.Request){
		useremail,err:=utils.VerifyUser(r)
		log.Println(useremail)
		if err!=nil{
			log.Println(err,err.Error())
			http.Error(w,"You are not logged in!",http.StatusBadRequest)

			
			return
		}

		vars:=mux.Vars(r)
		bookId:=vars["bookId"]
		Id,err:=strconv.ParseInt(bookId,0,0)
		if err!=nil{
			fmt.Println("Error occured while conversion")
		}
		mybook :=models.Book{}
		models.GetColumns(Id,[]string{"storename"},&mybook)
		
		newUser:=&models.User{}
		models.GetUserColumns(useremail,[]string{"storename"} ,newUser)

		if mybook.Storename!=newUser.Storename{
				http.Error(w,"You are not allowed to delete this !",http.StatusBadRequest)

			
			return
		}

		thatBook:=models.DeleteBook(Id)

		models.GetColumns(Id,[]string{"image_path"},&mybook)
		fileToDelete:=strings.Replace(mybook.ImagePath,os.Getenv("Book_Image_URL_For_Client"),os.Getenv("Book_Images_Path"),1)
		fmt.Println(fileToDelete)
		if err:=os.Remove(fileToDelete);err!=nil{
			log.Print(err)
		}else{
			fmt.Println("Old File Deleted")
		}
		res,_:=json.Marshal(thatBook)
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
		
	}
	func UpdateBook(w http.ResponseWriter,r *http.Request){

		useremail,err:=utils.VerifyUser(r)
		log.Println(useremail)
		if err!=nil{
			log.Println(err,err.Error())
					http.Error(w,"You are not logged in!",http.StatusBadRequest)
 
			
			return
		}
		vars:=mux.Vars(r)
		bookId:=vars["bookId"]
		Id,err:=strconv.ParseInt(bookId,0,0)

		newUser:=&models.User{}
		models.GetUserColumns(useremail,[]string{"storename"} ,newUser)
		
		mybook :=models.Book{}
		models.GetColumns(Id,[]string{"storename"},&mybook)

		if mybook.Storename!=newUser.Storename{
		http.Error(w,"You cannot Update this record",http.StatusBadRequest)

			return
		}

		err = r.ParseMultipartForm(10 << 20)
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode("Error parsing form")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		Book1 :=&models.Book{}
		// utils.ParseBody(r,Book1)
		JsonDoc:=r.Form.Get("documentj")
		if err:=json.Unmarshal([]byte(JsonDoc),&Book1);err!=nil{
			log.Print(err)
			fmt.Fprintf(w,"Error occured while reading the Details")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if err!=nil{
			fmt.Println("Error occured while conversion",Id)
			w.WriteHeader(http.StatusBadRequest)
			return 
		}
		 var hasImageChanged bool =((r.Form.Get("filename"))!="")
		if hasImageChanged{
			// log.Print("Image changed")
			var folderpath string = os.Getenv("Book_Images_Path")
			filepath ,err:=utils.FileUpload(r,folderpath)
			if err!=nil{
				log.Println(err)
				fmt.Fprintf(w,"Error While Updating the Book Image")
				return
				} 
			models.GetColumns(Id,[]string{"image_path"},&mybook)
			fileToDelete:=strings.Replace(mybook.ImagePath,os.Getenv("Book_Image_URL_For_Client"),os.Getenv("Book_Images_Path"),1)
			fmt.Println(fileToDelete)
			if err:=os.Remove(fileToDelete);err!=nil{
				log.Print(err)
			}else{
				fmt.Println("Old File Deleted")
			}
			//here
			filepath=strings.Replace(filepath,os.Getenv("Book_Images_Path"),os.Getenv("Book_Image_URL_For_Client"),1)
			Book1.ImagePath=filepath
		}else{
			log.Print("Image not changed")
		}
		res,_:=json.Marshal(models.UpdateBook(Id,*Book1))
		// res,_:=json.Marshal(Book1)
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