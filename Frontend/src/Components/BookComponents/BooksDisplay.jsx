import { useEffect, useState } from "react"
import { axiosWithAuthHeader } from "../../axiosInstance/withHeader"

import "./books.css"
import binIcon from "../../assets/bin-icon.png"
import editIcon from "../../assets/edit-icon.png"
import addIcon from "../../assets/add-icon (3).png"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../../configs/Urls"
import DeletePopup from "../MiscComponents/DeletePopup"
import { toast } from "react-toastify"

const BooksDisplay = () => {
    const [openDelete,setOpenDelete]=useState(false)
    const [selectedBook,setSelectedBook]=useState({})
    const BookCard=({book})=>{
        const handleDeleteBook=async()=>{
            try {
                setSelectedBook({id:book.id,name:book.title,...book})
                setOpenDelete(true)

            } catch (error) {
                console.log(error)
            }
        }
        const handleEditClick = ()=>{
            try{
                navigate(`../editbook/${book.id}`)
            }
            catch(err){
                console.log(err+" error occured during navigate")
            }
        }
        const handleCardClick = ()=>{try{
            navigate(`./viewbook/${book.id}`)
        }
        catch(err){
            console.log(err+" error occured during navigate")
        }
    }
        return(
            <>
            <div className="bookcard" >
                <div className="card-options">
                    <div >
                        <img src={editIcon} alt="edit" onClick={handleEditClick}/>
                    </div>
                    <div >
                        <img src={binIcon} alt="delete" onClick={handleDeleteBook}/>
                    </div>
                    
                </div>
                <div className="titlesection" style={{cursor:"pointer"}} onClick={handleCardClick}>
                    <img src={`${BASE_URL}/${book.image}`} alt=""  />
                </div>
                <div className="bookinfo" onClick={handleCardClick}>
                   <h4>
                    {book.title}
                    </h4> 
                    <ul>
                        <li>{"~"+book.author}</li>
                    </ul>
                </div>

            </div>
            </>
        )
    }
    
    const [allbooks, setAllBooks] = useState([
        
        
    ])
    const navigate=useNavigate()
    
    useEffect(() => {
        async function getallbooks() {
            try {
                const resp = await axiosWithAuthHeader.get(`${BASE_URL}/book/`)
                if (resp.data) {
                    setAllBooks(resp.data)
                    console.log(resp.data)
                }
                else{
                    setAllBooks(resp.data)
                    console.log("problem while fetching")
                }
            }
            
            catch (err) {
                console.log(err)
                console.log(allbooks)
                toast.error("Could not load Page",{onClose:()=>navigate("/login")})
            }
        }
        getallbooks()
    }, [])

    const emptyCardStyle={
        background:"transparent",
        outlineStyle:"dotted",
        outlineColor:"black ",
        // borderStyle:"dotted",
        // borderColor:"black",
        color:"black",
        transition:"all .4s ease-out",
        cursor:"pointer",
        alignItems:"center",
        justifyContent:"center",
         
    }
    const addIconStyle={
        width:"80px",
        height:"70px",
        margin:"20px 0",
        marginTop:"60px",
        padding:"2px 4px"
    }

    return (
        <>

            <div className="booksContainer">
                <div className="bookcard" style={emptyCardStyle}  onClick={()=>{navigate("../addbook")}}>
                    <img src={addIcon} alt="addicon"   style={addIconStyle} />
                    <div className="extra-context-for-transparent-card" >
                    Click to Add  Book
                    </div>
                </div>

                {true?
                allbooks.map((book)=>(
                    <BookCard key={book.ID} book={{id:book.ID,title:book.name, author:book.author, publication:book.publication , image:book.imagepath}}/>
                ))
                :<></>}
            <DeletePopup book={selectedBook} openstates={[openDelete,setOpenDelete]}/>
            </div>
        </>
    )
}

export default BooksDisplay