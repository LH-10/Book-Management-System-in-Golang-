package controllers

import(
	"fmt"
	"net/http"
	"log"
	"os"
	"github.com/golang-jwt/jwt/v5"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/models"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/utils"
	_"encoding/json"
	"strings"
)

func LoginHandler(w http.ResponseWriter,r *http.Request){
	loginUser:=&models.User{}
	utils.ParseBody(r,loginUser)
	fmt.Println(loginUser)
	dbHash:=loginUser.GetPasswordByEmail()
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
	"user": loginUser.Email,
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_Secret")))
	if err!=nil{
		fmt.Print(err)
	}
	fmt.Println(token,tokenString)
	models.GetUserColumns(loginUser.Email,[]string{"name","storename"},loginUser)
	response:=map[string]interface{}{
		"result": "success",
		"jwtToken": tokenString,
		"username":loginUser.Name,
		"storename":loginUser.Storename,
	}
	utils.MakeResponseJson(&w,response,true)	
	return
}
func SignupHandler(w http.ResponseWriter,r *http.Request){
	newUser:=&models.User{}

	utils.ParseBody(r,newUser)
	var err error
	newUser.Password,err=utils.EncryptPass(newUser.Password)

	if err!=nil{
		log.Println("error occured",err)
		utils.MakeResponseJson(&w,map[string]interface{}{
			"error":"error occured while registering", 
		},false)
		return
	}
	
	if err:=newUser.AddNewUser();err!=nil{
		errString:=err.Error()
		switch{

		case strings.Contains(errString,"users.email"):
			errString="Email Entry Already Exists"
		case strings.Contains(errString,"users.storename"):
			errString="StoreName Already Exists, Use a different storename"
		default:
			errString="Could not register user"
		}
		utils.MakeResponseJson(&w,map[string]interface{}{
			"error":errString, 
		},false)
		
		return
	}
	utils.MakeResponseJson(&w,map[string]interface{}{
		"result": "success",
		"user":newUser.Name,
	},true)
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