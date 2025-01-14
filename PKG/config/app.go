package config

import(
	"fmt"
	"errors"
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
	var username,pass,credString,databaseName string
	fmt.Printf("Enter mysql username:")
	fmt.Scan(&username)
	fmt.Printf("Enter corresponding password:")
	fmt.Scan(&pass)
	fmt.Printf("Enter database name:")
	fmt.Scan(&databaseName)
	credString=fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?charset=utf8&parseTime=True&loc=Local",username,pass,databaseName)
	fmt.Println("\n-----------------Done-----------------")
	return credString

}
