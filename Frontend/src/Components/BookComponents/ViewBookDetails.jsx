import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import "./ViewBookDetails.css"
import { BASE_URL } from "../../configs/Urls"
import { axiosWithAuthHeader } from "../../axiosInstance/withHeader"
import editIcon from "../../assets/edit-icon.png" 
import deleteIcon from "../../assets/bin-icon.png" 
import DeletePopup from "../MiscComponents/DeletePopup"
import { FaUser, FaBook, FaBarcode, FaTag, FaFileAlt } from 'react-icons/fa';
import { MdInventory } from "react-icons/md";
import { BiCategory } from "react-icons/bi";



export default function ViewBookDetails(){
    const {id}=useParams()
    const navigate=useNavigate()
    const [bookDetails,setBookDetails]=useState({})
    const [openDelete,setOpenDelete]=useState(false)
    useEffect(()=>{
        const fetchDetails=async () => {
            try {
                const response =await axiosWithAuthHeader.get(`${BASE_URL}/book/${id}`)
                if(response.data)
                setBookDetails(response.data)
            console.log(response)
            } catch (error) {
                console.log(error.response.data)
                toast.error(error.response.data)
            }
        }
        fetchDetails()
    },[])
    

    const handleDeleteClick=async()=>{
        try {
            const response =await axiosWithAuthHeader.delete(`${BASE_URL}/book/${id}`)
            toast.success("Deleted")
            console.log(response)
        } catch (error) {
            console.log(error)
            toast.error("Could not delete")
        }
    }

    return(
        <>
        <div className="view-bookdetails-container">
            <div className="option-btns">
                <span onClick={()=>navigate(`../editbook/${id}`)}><img src={editIcon} alt=""  /></span>{/*text was set in css to change edit in css file span::after*/}
                <span onClick={()=>{console.log("here");setOpenDelete(true)}} ><img src={deleteIcon} alt="" srcset="" /></span>
            
            </div>
            <div className="view-bookdetails-container-sub">

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
            <strong><FaUser /> Author</strong>
            <br />
            {bookDetails.author}
        </div>
        <div className="info-item">
            <strong><FaBook /> Publication</strong>
            <br />
            {bookDetails.publication}
        </div>
    </div>
    <div className="info-row">
        <div className="info-item">
            <strong><MdInventory     /> Stock</strong>
            <br />
            {bookDetails.stock}
        </div>
        <div className="info-item">
            <strong><FaTag /> Price</strong>
            <br />
            ₹{bookDetails.price}
        </div>
    </div>
    <div className="info-row">
    <div className="info-item">
            <strong><FaBarcode /> ISBN</strong>
            <br />
            {bookDetails.isbn}
        </div>
   <div className="info-item">
            <strong><BiCategory /> Genre</strong>
            <br />
            {bookDetails.genre}
        </div>
        </div>
    <div className="summary">
        <strong><FaFileAlt /> Summary</strong>
        <br />
        {bookDetails.summary}
    </div>
</div>
            </div>
            </div>
        </div>
        <DeletePopup book={{id:id,...bookDetails}} openstates={[openDelete,setOpenDelete]}/>
        </>
    )
}