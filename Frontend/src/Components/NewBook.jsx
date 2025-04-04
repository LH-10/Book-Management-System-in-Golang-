import { useRef, useState } from "react";
// import { navigate, Route } from "react-router-dom"
import "./NewBook.css"
import ImageUpload from "./ImageUpload";
import { BASE_URL } from "../configs/Urls"
import axios from "axios"

export default function NewBook() {

    const [bookTitle, bookAuthor, bookPublication, bookPrice] = [useRef(), useRef(), useRef(), useRef()]
    const imageFile=useRef()

    const handlSubmit= async (e)=>{
        e.preventDefault()

        const formData=new FormData()
        const Jobj={
            name:bookTitle.current.value,
            Author:bookAuthor.current.value,
            Publication:bookPublication.current.value
        }
        formData.append("documentj",JSON.stringify(Jobj))
        console.log(Jobj)
        formData.append("filename",Jobj.name)
        formData.append("file",imageFile.current.files[0])
        try{

            const response=await axios.post(`${BASE_URL}/book/`,formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            console.log(response)
        }
        catch(err){
            console.log(err)
        }

    }
    

    return (
        <>
            <form className="book-form-container" onSubmit={handlSubmit}>

                <div className="image-upload" >
                    <ImageUpload textToDisplay={"Upload Book Image"} fileRef={imageFile} />
                </div>
                <div className="book-details-input">
                    <label htmlFor="">Title</label>
                    <input type="text" ref={bookTitle} placeholder="Enter book title" id="title" required pattern="^[a-zA-Z0-9\s]+$" />

                    <label htmlFor="">Author</label>
                    <input type="text" ref={bookAuthor} placeholder="Enter author's name" id="author" required pattern="^[a-zA-Z\s]+$" />

                    <label htmlFor="">Publication</label>
                    <input type="text" ref={bookPublication} placeholder="Enter publication name" id="publication" required pattern="^[a-zA-Z0-9\s]+$" />

                    <label htmlFor="">Price</label>
                    <input type="text" ref={bookPrice} placeholder="Enter book price" id="price" required pattern="^\d+(\.\d{1,2})?$" />

                    <button type="submit" >Submit</button>
                </div>
            </form>
        </>
    )
}