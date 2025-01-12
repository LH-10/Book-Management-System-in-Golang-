package config

import(
	
	"errors"
	"github.com/jinzhu/gorm"
	_"github.com/jinzhu/gorm/dialects/mysql"
)

var  ( db *gorm.DB
)
func DbConnect() (error){
	d,err:=gorm.Open("mysql","root:sqlsys@tcp(127.0.0.1:3306)/bookstore?charset=utf8&parseTime=True&loc=Local")
	if err!=nil{
		return errors.New("Error occured during connection")
	}
	db=d
	return nil
}
func GetDb() *gorm.DB{
	return db
}

