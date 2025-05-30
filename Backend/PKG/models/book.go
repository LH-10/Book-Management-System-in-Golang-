package models

import(
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/LH-10/Book-Management-System-in-Golang-/PKG/config"
	"time"
)

var db *gorm.DB

// type Book struct{
// 	gorm.Model
// 	Name string `gorm:""json:"name"`
// 	Author string `json:"author"`
// 	Publication string `json:"publication"`
// 	ImagePath string  `json:"imagepath"`
// }
type Book struct{
	gorm.Model
	Name string `gorm:""json:"name"`
	Author string `json:"author"`
	Publication string `json:"publication"`
	ImagePath string  `json:"imagepath"`
	Summary string	`json:"summary"`
	Price int64 `json:"price"`
	Stock uint32 `json:"stock"`
	Isbn string `json:"isbn"`
	Storename string 
	User User `gorm:"foreignKey:Storename , references:Storename"`
	
	//`gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE,references:Storename;"`
}

func init(){
	err:=config.DbConnect()
	if err!=nil{
		fmt.Println("error occured")
		return
	}
	db=config.GetDb()
	db.AutoMigrate(&Book{})
	fmt.Println("Initializing database....")
	go func (){
		time.Sleep(2 * time.Second)
		db.Model(&Book{}).AddForeignKey("storename", "users(storename)", "RESTRICT", "CASCADE")
		fmt.Println("\nInitialization Complete")
	}()
}

func (bk *Book) CreateBook() (*Book){
 db.NewRecord(bk)
 db.Create(&bk)
 return bk
}

func GetAllBooks(storename string) ([]Book){
	var allbooks []Book
	db.Where("storename=?",storename).Find(&allbooks)
	return allbooks
}

func GetBookById(Id int64)(*Book,*gorm.DB){
	var mybook *Book=&Book{}
	db.Where("ID=?",Id).Find(mybook)
	return mybook,db
}

func DeleteBook(Id int64) Book{
	var dbook Book
 db.Where("ID=?",Id).Delete(dbook)
 return dbook
}

func GetColumns(Id int64,columnlist []string,customStruct *Book){
	// var dbook struct{ImagePath string}
	_=db.Table("books").Select(columnlist).Where("ID=?",Id).Scan(&customStruct)
	fmt.Println(columnlist,customStruct)
}

func UpdateBook(Id int64,upBook Book) Book{
	var mybook Book
	db.First(&mybook,Id)
	db.Model(&mybook).Updates(upBook)
	return upBook
}

