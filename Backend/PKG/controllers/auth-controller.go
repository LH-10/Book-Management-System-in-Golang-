package controllers

import(
	"fmt"
	"net/http"
	"log"
	"os"
	"github.com/golang-jwt/jwt/v5"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/models"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/utils"
	"encoding/json"
	_"strings"
)

func LoginHandler(w http.ResponseWriter,r *http.Request){
	loginUser:=&models.User{}
	utils.ParseBody(r,loginUser)
	fmt.Println(loginUser)
	dbHash:=loginUser.GetByUsername()
	passwordMatch,err:=utils.ComparePasswordAndHash(loginUser.Password,dbHash)

	if err!=nil{
		log.Print(err)
		return
	}
	if !passwordMatch{
		log.Print("Password Mismatch\n")
		http.Error(w,"Incorrect Username or Password",http.StatusBadRequest)
		return
	}
		
	log.Println("Login Successfull")
	
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	"user": loginUser.Name,
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_Secret")))
	if err!=nil{
		fmt.Print(err)
	}
	fmt.Println(token,tokenString)
	response:=map[string]interface{}{
		"result": "success",
		"jwtToken": tokenString,
	}
	jsonResponse,err:=json.Marshal(response)
	if err!=nil{
	http.Error(w, "Error Occured during parsing", http.StatusInternalServerError)

	}
	w.Header().Set("Content-Type", "application/json")

	_, err = w.Write(jsonResponse)
	if err != nil {
		http.Error(w, "Error Occured during parsing", http.StatusInternalServerError)
		return
	}	
		 
}
func SignupHandler(w http.ResponseWriter,r *http.Request){
	newUser:=&models.User{}

	utils.ParseBody(r,newUser)
	var err error
	newUser.Password,err=utils.EncryptPass(newUser.Password)

	if err!=nil{
		log.Println("error occured",err)
		return
	}
	
	newUser.AddNewUser()
	return 
}


func VerifyUser(w http.ResponseWriter,r *http.Request){
	// authHeader:=r.Header.Get("Authorization")
	// jwtToken:=strings.Replace(authHeader,"Bearer ","",1)
	// newUser:=&models.User{}
	// utils.ParseBody(r,newUser)
	// token,err:=jwt.Parse(jwtToken,func(token *jwt.Token)(interface{},error){
	// 	return []byte(os.Getenv("JWT_Secret")),nil
	// },jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	// if err!=nil{
	// 	log.Print("Error occured ",err.Error())
	// 	return
	// }
	// fmt.Println(token)
	user,err:=utils.VerifyUser(r)
	if err!=nil{
		http.Error(w,"error occured",http.StatusBadRequest)
		return
	}
	w.Write([]byte(user))
	 
}