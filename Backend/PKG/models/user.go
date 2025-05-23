package models

import(
	_"fmt"
	"github.com/jinzhu/gorm"
	_"github.com/LH-10/Book-Management-System-in-Golang-/PKG/config"
)


type User struct {
	gorm.Model
	Name string `gorm:""json:"name"`
	Email string `gorm:"unique" json:"email"`
	Storename string `gorm:"unique" json:"storename"`
	Password string `json:"password"`
}

func init(){
	//db variable is accessible from book.go
	db.AutoMigrate(&User{})
}

func (usr *User) AddNewUser()(error){

	db.NewRecord(usr)
	result:=db.Create(usr)
	if result.Error!=nil{
		return result.Error
	}
	return nil
}
func (usr *User) GetPasswordByEmail()(string){
	getUser:=&User{}
	db.Where("email=?",usr.Email).Find(getUser)
	return getUser.Password
}
func GetUserColumns(email string,columnlist []string,customStruct *User){
	_=db.Table("users").Select(columnlist).Where("email=?",email).Scan(&customStruct)
}
// func GetUser(usremail string)(user){

// }