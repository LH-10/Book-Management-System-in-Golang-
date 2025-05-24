package config

import(
	"fmt"
	"errors"
	"os"
	"github.com/joho/godotenv"

	"github.com/jinzhu/gorm"
	_"github.com/jinzhu/gorm/dialects/mysql"
)

var  ( db *gorm.DB
)
func DbConnect() (error){
	mysqlString:=userString()
	d,err:=gorm.Open("mysql",mysqlString)
	if err!=nil{
		return errors.New("Error occured during connection")
	}
	db=d
	return nil
}
func GetDb() *gorm.DB{
	return db
}

func userString() string {
	err:= godotenv.Load()

	if err!=nil{
		fmt.Println(err)
	}
	// var username,pass,credString,databaseName string
	// fmt.Printf("Enter mysql username:")
	// fmt.Scan(&username)
	// fmt.Printf("Enter corresponding password:")
	// fmt.Scan(&pass)
	// fmt.Printf("Enter database name:")
	// fmt.Scan(&databaseName)
	// credString=fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?charset=utf8&parseTime=True&loc=Local",username,pass,databaseName)
	User,Password,Databasename:=os.Getenv("SQL_User"),os.Getenv("SQL_Password"),os.Getenv("Database_Name")
	fmt.Println(User,Password,Databasename)
	 credString:=fmt.Sprintf("%v:%v@tcp(127.0.0.1:3306)/%v?charset=utf8&parseTime=True&loc=Local",User,Password,Databasename)
	fmt.Println("\n-----------------Done-----------------")
	return credString

}
