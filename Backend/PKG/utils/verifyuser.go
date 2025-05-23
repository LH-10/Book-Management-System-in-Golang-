package utils
import(
	"log"
	"fmt"
	"os"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"strings"
)
func VerifyUser(r *http.Request)(string,error){
	authHeader:=r.Header.Get("Authorization")
	fmt.Println(authHeader)
	jwtToken:=strings.Replace(authHeader,"Bearer ","",1)
	//for testing disabling jwt verify
	// return "user@user1.com",nil

	token,err:=jwt.Parse(jwtToken,func(token *jwt.Token)(interface{},error){
		return []byte(os.Getenv("JWT_Secret")),nil
	},jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))

	if err!=nil{
		log.Print("Could not verify user ",err.Error())
		return "",err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		log.Println(err)
		return "",err
	}
	user:=fmt.Sprintf("%v",(claims["user"]))
	return user,nil
}