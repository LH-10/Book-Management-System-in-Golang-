import { useEffect, useState } from "react"
import axios from "axios"
import "./books.css"
const BooksDisplay = () => {


    const BookCard=({book})=>{
        return(
            <>
            <div className="bookcard">
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
        {"id": 2,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 3,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 4,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 5,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 6,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 7,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 8,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 9,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 5,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
        ,{"id": 10,
        "CreatedAt": "2025-01-13T20:39:57+05:30",
        "UpdatedAt": "2025-01-13T20:39:57+05:30",
        "DeletedAt": null,
        "name": "sijao",
        "author": "LHHH",
        "publication": "10000"}
    ])

    useEffect(() => {
        async function getallbooks() {
            try {
                resp = await axios.get("http://localhost:8000/book")
                if (resp.data) {
                    setAllBooks(resp.data)
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
                    <BookCard key={book.id} book={{title:book.name, author:book.author, publication:book.publication}}/>
                ))
                :<></>}

            </div>
        </>
    )
}

export default BooksDisplay