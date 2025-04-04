import { useRef, useState } from "react";
// import { navigate, Route } from "react-router-dom"
import "./NewBook.css"
import ImageUpload from "./ImageUpload";
import axios from "axios"
export default function NewBook() {

    const [bookTitle, bookAuthor, bookPublication, bookPrice] = [useRef(), useRef(), useRef(), useRef()]
    const imageFile=useRef()

    const handlSubmit=(e)=>{
        e.preventDefault()

       

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