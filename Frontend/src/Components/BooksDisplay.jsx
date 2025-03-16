import { useEffect, useState } from "react"
import axios from "axios"
import "./books.css"
import binIcon from "../assets/bin-icon.png"
import editIcon from "../assets/edit-icon.png"
const BooksDisplay = () => {


    const BookCard=({book})=>{
        return(
            <>
            <div className="bookcard">
                <div className="card-options">
                    <div >
                        <img src={editIcon} alt="edit"/>
                    </div>
                    <div >
                        <img src={binIcon} alt="delete"/>
                    </div>
                    
                </div>
                <div className="titlesection">
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
    return (
        <>
            <div className="booksContainer">
                {true?
                allbooks.map((book)=>(
                    <BookCard key={book.ID} book={{title:book.name, author:book.author, publication:book.publication}}/>
                ))
                :<></>}

            </div>
        </>
    )
}

export default BooksDisplay