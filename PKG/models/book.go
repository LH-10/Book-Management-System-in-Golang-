package models

import(
	"github.com/jinzhu/gorm"
	"github.com/LH10/Book-Management-System-in-Golang-/PKG/config"
)

var db *gorm.DB

type Book struct{
	grom.model
	Name string `gorm:""json:"name"`
	Author string `json:"author"`
	Publication string `json:"publication"`

}

func init(){
	config.DbConnect()
	db=config.GetDb()
	db.AutoMigrate(&Book{})
}

func (bk *Book) CreateBook() (*Book){
 db.NewRecord(bk)
 db.Create(&bk)
 return bk
}

func GetAllBooks() ([]Book){
	var allbooks []Book
	db.Find(&allbooks)
	return allbooks
}

func GetBookById(Id int64)(*Book,*gorm.DB){
	var mybook *Book
	db.Where("ID=?",Id).Find(&mybook)
	return mybook,db
}

func DeleteBook(Id int64) Book{
	var dbook Book
 db.Where("ID=?",Id).Delete(dbook)
 return dbook
}

func UpdateBook(Id int64,upBook Book) Book{
	var mybook Book
	db.First(&mybook,Id)
	db.Model(&mybook).Updates(upBook)
	return upBook
}

