package config

import(
	"fmt"
	"errors"
	"github.com/jinzhu/gorm"
	_"github.com/jinzhu/gorm/dialects/mysql"
)

var  {
	db *gorm.DB
}

func DbConnect() {
	d,err:=gorm.Open("mysql","root:sqlsys/bookstore?charsetUTF8")
	if err!=nil{
		return errors.New("Error occured during connection")
	}
	db=d
}
func GetDb() *gorm.DB{
	return db
}

