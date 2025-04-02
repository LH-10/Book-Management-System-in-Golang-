package utils

import (
	"net/http"
	"path/filepath"
	"os"
	"errors"
	"fmt"
	"io"
	"time"
	"strings"
	
)


func FileUpload(r *http.Request,fileFolderName string)( string,error){
	filepth:=""
	name:=r.Form.Get("filename")
	name=fmt.Sprintf("%v%v",time.Now().Unix(),name)
	if name=="" {
		return filepth, errors.New("Error Occured")
	}
	f,handler,err:=r.FormFile("file")
	if err!=nil{
		return filepth, errors.New("Error while Parsing file")
	}
	
	defer f.Close()
	fileExtentsion:=strings.ToLower(filepath.Ext(handler.Filename))
	folderpath:=fileFolderName
	_=os.MkdirAll(folderpath,os.ModePerm)
	
	completePath:=filepath.Join(folderpath,name+fileExtentsion)

	file,err:=os.OpenFile(completePath, os.O_WRONLY|os.O_CREATE ,os.ModePerm)
	if err!=nil{
		fmt.Println(err)
		return filepth, errors.New("Error while Creating File")
	}
	defer file.Close()

	_,err=io.Copy(file,f)

	if err!=nil{
		return filepth, errors.New("Error while copying file")
	}
	filepth=strings.ReplaceAll(completePath,"\\","/") 
	//Since filepath.Join converts forwards slashes to backward conveting them back '\\' in a string shows up as \

	return filepth, nil

}