import { useEffect, useState } from "react"
import axios from "axios"
import "./books.css"
import binIcon from "../assets/bin-icon.png"
import editIcon from "../assets/edit-icon.png"
import addIcon from "../assets/add-icon (3).png"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../configs/Urls"

const BooksDisplay = () => {

    
    const BookCard=({book})=>{
        const handleDeleteBook=async()=>{
            try {
                const response= await axios.delete(`${BASE_URL}/book/${book.id}`)
                console.log(response)
                window.location.reload();

            } catch (error) {
                console.log(error)
            }
        }
        return(
            <>
            <div className="bookcard">
                <div className="card-options">
                    <div >
                        <img src={editIcon} alt="edit"/>
                    </div>
                    <div >
                        <img src={binIcon} alt="delete" onClick={handleDeleteBook}/>
                    </div>
                    
                </div>
                <div className="titlesection">
                    <img src={`${BASE_URL}/${book.image}`} alt="" srcset="" />
                   <h3>
                    {book.title}
                    </h3> 
                </div>
                <div className="bookinfo">
                    <ul>
                        <li>{book.author}</li>
                        <li>{book.publication}</li>
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
                const resp = await axios.get("http://localhost:8000/book/")
                if (resp.data) {
                    setAllBooks(resp.data)
                    console.log(resp.data)
                }
                else{
                    console.log("problem while fetching")
                }
            }
            
            catch (err) {
                console.log(err)
                console.log(allbooks)
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
                    <img src={addIcon} alt="addicon"  srcset="" style={addIconStyle} />
                    <div className="extra-context-for-transparent-card" >
                    Click to Add  Book
                    </div>
                </div>

                {true?
                allbooks.map((book)=>(
                    <BookCard key={book.ID} book={{id:book.ID,title:book.name, author:book.author, publication:book.publication , image:book.ImagePath}}/>
                ))
                :<></>}

            </div>
        </>
    )
}

export default BooksDisplay