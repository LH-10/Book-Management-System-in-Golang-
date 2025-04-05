import { useRef, useState } from "react";
// import { navigate, Route } from "react-router-dom"
import "./NewBook.css"
import ImageUpload from "./ImageUpload";
import { BASE_URL } from "../configs/Urls"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Slide, toast, ToastContainer } from "react-toastify";

export default function NewBook() {

    const [bookTitle, bookAuthor, bookPublication, bookPrice] = [useRef(), useRef(), useRef(), useRef()]
    const imageFile=useRef()
    const navigate=useNavigate()
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
            if(response.data.name){
                toast.success('New Book Added',{
                    theme:"colored",
                    position:"top-center",
                    onClose:(()=>{
                        navigate('./dashboard')
                    })
                })
            }
            else{
                toast.error('Failed',{
                    position:"top-center",
                    theme:"colored"
                })
            }
        }
        catch(err){
            toast.error('Failed',{
                position:"top-center",
                theme:"colored"
            })
            console.log(err)
            throw new Error(""+err)
        }

    }
    

    return (
        <>
        <div className="outer-book-form-cont">

            <form className="book-form-container" onSubmit={(e)=>{ e.preventDefault()
              toast.promise(
                  handlSubmit(e),
                  {
                      pending: 'Submitting the form...',
                                          
                    }
                )  
            }}>

                <div className="image-upload" >
                    <ImageUpload textToDisplay={"Upload Book Image"} fileRef={imageFile} />
                </div>
                <div className="book-details-input">
                    <label htmlFor="">Title</label>
                    <input type="text" ref={bookTitle} placeholder="Enter book title" id="title" required pattern="^[a-zA-Z0-9\s]+$" />

                    <label htmlFor="">Author</label>
                    <input type="text" ref={bookAuthor} placeholder="Enter author's name" id="author" required pattern="^[a-zA-Z\s.]+$" />

                    <label htmlFor="">Publication</label>
                    <input type="text" ref={bookPublication} placeholder="Enter publication name" id="publication" required pattern="^[a-zA-Z0-9\s]+$" />

                    <label htmlFor="">Price</label>
                    <input type="text" ref={bookPrice} placeholder="Enter book price" id="price" required pattern="^\d+(\.\d{1,2})?$" />

                    <button type="submit" >Submit</button>
                </div>
            </form>
                    </div>
            <ToastContainer theme="light" position="bottom-left" autoClose={2000} transition={Slide}/>
        </>
    )
}