import { useRef, useState } from "react";
// import { navigate, Route } from "react-router-dom"
import "./NewBook.css"
import ImageUpload from "../MiscComponents/ImageUpload";
import { BASE_URL } from "../../configs/Urls"
import { axiosWithAuthHeader } from "../../axiosInstance/withHeader";
import { useNavigate } from "react-router-dom"
import { Slide, toast, ToastContainer } from "react-toastify";

export default function NewBook() {

    const [bookTitle, bookAuthor, bookPublication, bookPrice,bookIsbn,bookSummary,bookStock,bookGenre] = [useRef(),useRef(), useRef(), useRef(), useRef(),useRef(), useRef(),useRef()]
    const imageFile=useRef()
    const navigate=useNavigate()
    const handlSubmit= async (e)=>{
        e.preventDefault()

        const formData=new FormData()
        const Jobj={
            name:bookTitle.current.value,
            Author:bookAuthor.current.value,
            Publication:bookPublication.current.value,
            Isbn:bookIsbn.current.value,
            Price:parseInt(bookPrice.current.value),
            Summary:bookSummary.current.value,
            Stock:parseInt(bookStock.current.value),
            Genre:(bookGenre.current.value),
        }
        formData.append("documentj",JSON.stringify(Jobj))
        console.log(Jobj)
        formData.append("filename",Jobj.name)
        formData.append("file",imageFile.current.files[0])
        try{

            const response=await axiosWithAuthHeader.post(`${BASE_URL}/book/`,formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            console.log(response)
            if(response.data.name){
                toast.success('New Book Added',{
                    theme:"colored",
                    position:"top-center",
                    onClose:(()=>{
                        navigate('../dashboard')
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
            console.log(err.response.data)
                toast.error(err.response.data)
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
                    <input type="text" ref={bookTitle} placeholder="Enter book title" id="title" required pattern="^[a-zA-Z0-9\s:]+$" />

                    <label htmlFor="">Author</label>
                    <input type="text" ref={bookAuthor} placeholder="Enter author's name" id="author" required pattern="^[a-zA-Z\s.]+$" />

                    <label htmlFor="">Isbn</label>
                    <input type="text" ref={bookIsbn} placeholder="Enter book price" id="price" required  />
                    <label htmlFor="">Stock</label>
                    <input type="number" ref={bookStock} placeholder="Enter book price" id="stock" required min={0} pattern="^\d+(\.\d{1,2})?$"  />
                        
                    <label htmlFor="">Price</label>
                    <input type="text" ref={bookPrice} placeholder="Enter book price" id="price" required pattern="^\d+(\.\d{1,2})?$" />
                        <input type="checkbox" id="toggle-details" style={{ display: 'none' }} />
                        
                        <label className="toggle-label" htmlFor="toggle-details"></label>

                        <div className="details">

                    <label htmlFor="">Publication</label>
                    <input type="text" ref={bookPublication} placeholder="Enter publication name" id="publication" required pattern="^[a-zA-Z0-9\s]+$" />
                    <label htmlFor="">Genre</label>
                    <select type="text" ref={bookGenre} id="genre" >
                        {
                        ["Classic Fiction","Science Fiction", 
                          "Fantasy","Mystery","Romance","Non-Fiction"].map(
                            (current)=>{
                           return <option key={current} value={current}> {current} </option>
                        }
                        )
                        }
                        </select>
                    <label htmlFor="summary">Description</label>
                            <textarea
                            ref={bookSummary}
                            id="summary"
                            placeholder="Enter book summary"
                            rows="4"
                            />
                    
                        </div>
                    <button type="submit" >Submit</button>
                </div>
            </form>
                    </div>
            <ToastContainer theme="light" position="bottom-left" autoClose={2000} transition={Slide}/>
        </>
    )
}