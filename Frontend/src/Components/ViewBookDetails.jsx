import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import "./ViewBookDetails.css"
import { BASE_URL } from "../configs/Urls"
import axios from "axios"

export default function ViewBookDetails(){
    const {id}=useParams()
    const [bookDetails,setBookDetails]=useState({})
    useEffect(()=>{
        const fetchDetails=async () => {
            try {
                const response =await axios.get(`${BASE_URL}/book/${id}`)
                if(response.data)
                setBookDetails(response.data)
            console.log(response)
            } catch (error) {
                console.log(error)
                toast.error("Could not fetch data")
            }
        }
        fetchDetails()
    },[])

    return(
        <>
        <div className="view-bookdetails-container">
            <div className="image-side">
                <img src={`${BASE_URL}/${bookDetails.imagepath}`} alt="img"  />
                <div className="title-div">
                    <h3 >{bookDetails.name}</h3>
                </div>
            </div>
            <div className="info-side">
            <div className="info-side-sub">
                <div className="info-row">
                    <div className="info-item">
                    <strong>Author</strong>
                    <br />
                    {bookDetails.author}
                    </div>
                    <div className="info-item">
                    <strong>Publication</strong>
                    <br />
                    {bookDetails.publication}
                    </div>
                </div>
                <div className="info-row">
                    <div className="info-item">
                    <strong>ISBN</strong>
                    <br />
                    {bookDetails.isbn}
                    </div>
                    <div className="info-item">
                    <strong>Price</strong>
                    <br />
                    ₹{bookDetails.price}
                    </div>
                </div>
                <div className="summary">
                    <strong>Summary</strong>
                    <br />
                    {bookDetails.summary}
                </div>
        </div>
            </div>
        </div>
        </>
    )
}