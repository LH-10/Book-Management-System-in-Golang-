package config

import(
	"fmt"
	"errors"
	"os"
	"github.com/joho/godotenv"
	"github.com/jinzhu/gorm"
	"log"
	"time"
	_"github.com/jinzhu/gorm/dialects/mysql"
)

func init(){
	err:=godotenv.Load()
	if err!=nil{
		log.Fatal(err)
	}
}

var  ( db *gorm.DB
)
func DbConnect() (err error){
	mysqlString:=userString()
	for i:=0;i<10;i++{	
	d,err:=gorm.Open("mysql",mysqlString)
	if err==nil && d.DB().Ping()==nil{
		fmt.Println("connected",i)
		db=d
		break
		// return errors.New("Error occured during connection")
	}
	log.Println("Attempting to conenct to database ",i)
	time.Sleep(2 * time.Second)
}
	if err!=nil{
		return errors.New("Error occured during connection")
	}
	return nil
}
func GetDb() *gorm.DB{
	return db
}

func userString() string {

	
	// var username,pass,credString,databaseName string
	// fmt.Printf("Enter mysql username:")
	// fmt.Scan(&username)
	// fmt.Printf("Enter corresponding password:")
	// fmt.Scan(&pass)
	// fmt.Printf("Enter database name:")
	// fmt.Scan(&databaseName)
	// credString=fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?charset=utf8&parseTime=True&loc=Local",username,pass,databaseName)
	User,Password:=os.Getenv("SQL_User"),os.Getenv("SQL_Password")
	Hostname,Databasename:=os.Getenv("Host_Name"),os.Getenv("Database_Name")
	fmt.Println(User,Password,Databasename)
	 credString:=fmt.Sprintf("%v:%v@tcp(%v:3306)/%v?charset=utf8&parseTime=True&loc=Local",User,Password,Hostname,Databasename)
	 fmt.Println(credString)
	fmt.Println("\n-----------------Done-----------------")
	return credString

}
