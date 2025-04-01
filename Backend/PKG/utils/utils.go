package utils

import(
	"io"
	"encoding/json"
	"net/http"
)

func ParseBody(r *http.Request,x interface{}){
	if body,err:= io.ReadAll(r.Body) ; err==nil{
		if err:=json.Unmarshal([]byte(body),x) ; err!=nil{
			return
		}
	}
}