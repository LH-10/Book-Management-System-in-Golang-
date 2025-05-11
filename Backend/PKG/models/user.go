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
	Password string `json:"password"`
}

func init(){
	db.AutoMigrate(&User{})
}

func (usr *User) AddNewUser(){
	db.NewRecord(usr)
	db.Create(usr)
}
func (usr *User) GetByUsername()(string){
	getUser:=&User{}
	db.Where("name=?",usr.Name).Find(getUser)
	return getUser.Password
}