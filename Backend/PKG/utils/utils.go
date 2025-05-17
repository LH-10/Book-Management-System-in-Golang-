package utils

import(
	"io"
	"encoding/json"
	"net/http"
	"fmt"
)

func ParseBody(r *http.Request,x interface{}){
	if body,err:= io.ReadAll(r.Body) ; err==nil{
		if err:=json.Unmarshal([]byte(body),x) ; err!=nil{
			return
		}
	}
}

func MakeResponseJson(w *http.ResponseWriter,data map[string]interface{},isSuccess bool){
	(*w).Header().Set("Content-Type", "application/json")
	jsonError:=fmt.Sprintf("%v",(data["error"]))
	jsonResponse,err:=json.Marshal(data)
	parseError:=" server error while responding" 
	
	if err!=nil{
	http.Error((*w), parseError, http.StatusInternalServerError)
	return
	}
	if !isSuccess{
		http.Error((*w),jsonError,http.StatusBadRequest)
		return
	}
	_,err=(*w).Write(jsonResponse)
	if err!=nil{
	http.Error((*w), parseError, http.StatusInternalServerError)
	return
	}
}