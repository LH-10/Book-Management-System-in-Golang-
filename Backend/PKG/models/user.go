package models

import(
	_"fmt"
	"github.com/jinzhu/gorm"
	_"github.com/LH-10/Book-Management-System-in-Golang-/PKG/config"
)


type User struct {
	gorm.Model
	Name string `gorm:""json:"name"`
	Email string `json:"email"`
	Storename string `gorm:"unique" json:"storename"`
	Password string `json:"password"`
}

func init(){
	//db is accessible from book.go
	db.AutoMigrate(&User{})
}

func (usr *User) AddNewUser(){
	db.NewRecord(usr)
	db.Create(usr)
}
func (usr *User) GetByEmail()(string){
	getUser:=&User{}
	db.Where("email=?",usr.Email).Find(getUser)
	return getUser.Password
}