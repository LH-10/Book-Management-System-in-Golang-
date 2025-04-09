import { useEffect, useRef, useState } from "react";
import "./EditBook.css";
import { useParams } from "react-router-dom"
import ImageUpload from "./ImageUpload";
import sampleImg from "/Hobbit_.jpg"
import { toast } from "react-toastify";
import saveIcon from "../assets/saveicon (2).png"
import bookInfoIcon from "../assets/open-book.png"
import moreInfoIcon from "../assets/document.png"
import bookCoverIcon from "../assets/bookcover.png"
import axios from "axios";
import { BASE_URL } from "../configs/Urls";
// import publicationinfo from "../assets/publication.png"

export default function EditBookPage() {
    const [book, setBook] = useState({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publication: "Scribner",
        price: 800,
        imagepath:"",
        description: "A novel of mystery and tragedy set in the Roaring Twenties, The Great Gatsby follows the story of the wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        isbn: "9780743273565",
        genre: "Classic Fiction",
    });
    const [changesMade,setChangesMade]=useState(0)
    const {bkid} = useParams()

    useEffect(() => {
        async function fetchAllBookDetails() {
            try{
                const response=await axios.get(`${BASE_URL}/book/${bkid}`)
                console.log(response)
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBookDetails()
    }, [changesMade])

    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Book details saved successfully!");
    };

    const LabeledInput = ({
        labelText,
        name,
        value,
        inputType = "text",
        divType = "",
        fieldIcon = "",
        options = [],
        placeholder = "",
        required = false
    }) => {
        return (
            <div className={`input-container ${divType}`}>
                <label htmlFor={name}>
                    {fieldIcon && <span> <img src={fieldIcon} alt="" /> </span>}
                    {labelText}
                </label>

                {inputType === "textarea" ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                    />
                ) : inputType === "select" ? (
                    <select
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        required={required}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={inputType}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        step={inputType === "number" ? "0.01" : undefined}
                        min={inputType === "number" ? "0" : undefined}
                    />
                )}
            </div>
        );
    };

    return (
        <>
            <div className="editbook-form-container">
                <div className="edit-form-header-container">
                    <div className="header-content">
                        <h1>Edit Book Details</h1>
                        <p>Update information for this book in your inventory</p>
                    </div>
                    <div className="header-buttons">
                        <button type="button" className="header-btn cancel-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={22} height={17} viewBox="0 0 23 23"
                                fill="none"
                                stroke={"white"} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <line x1="19" y1="6" x2="8" y2="18" />
                                <line x1="8" y1="6" x2="19" y2="18" />
                            </svg>
                            Cancel
                        </button>
                        <button type="button" className="header-btn save-btn">
                            <img src={saveIcon} alt="" className="iconimg" />
                            Save Changes
                        </button>
                    </div>
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <div className="edit-form-details-grid">
                        <div className="image-section">

                            <div className="book-cover-container">
                                <h3 >
                                    <img src={bookCoverIcon} alt="" style={{width:"32px",height:"24px"}} />
                                    Existing Book Cover
                                </h3>
                                <div className="book-image-container">
                                    <div className="book-image">
                                        <img src={sampleImg || "/placeholder.svg"} alt="Prev image" />
                                    </div>
                                </div>
                                <ImageUpload externalStyles={{ height: "160px", margin: "12px 0px" }} textToDisplay="Upload New Image Here" />
                            </div>
                        </div>
                        <div className="editdetails-input-sections">
                            <div className="details-input-subs">
                                <div className="section-title">
                            <img src={bookInfoIcon} alt="" style={{width:"28px",height:"24px",margin:"0 4px"}}/>
                                    <h3>Basic Information</h3>
                                </div>
                                <div className="input-grid">
                                    <LabeledInput
                                        labelText="Book Title"
                                        name="title"
                                        value={book.title}
                                        divType="full-width"
                                        required={true}
                                    />

                                    <LabeledInput
                                        labelText="Author"
                                        name="author"
                                        value={book.author}
                                        fieldIcon="user"
                                        divType="full-width"
                                        required={true}
                                    />

                                    <LabeledInput
                                        labelText="Publisher"
                                        name="publication"
                                        value={book.publication}
                                        required={true}
                                    />

                                    

                                    <LabeledInput
                                        labelText="Genre"
                                        name="genre"
                                        value={book.genre}
                                        inputType="select"
                                        options={[
                                            { value: "Classic Fiction", label: "Classic Fiction" },
                                            { value: "Science Fiction", label: "Science Fiction" },
                                            { value: "Fantasy", label: "Fantasy" },
                                            { value: "Mystery", label: "Mystery" },
                                            { value: "Romance", label: "Romance" },
                                            { value: "Non-Fiction", label: "Non-Fiction" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="details-input-subs">
                                <div className="section-title">
                                    <img src={moreInfoIcon} alt="" style={{width:"20px",height:"20px",margin:"0 4px"}}/>
                                    {/* <!-- FileText icon will go here --> */}
                                    <h3>Additional Details</h3>
                                </div>
                                <div className="input-grid">
                                    <LabeledInput
                                        labelText="Price (₹)"
                                        name="price"
                                        value={book.price}
                                        inputType="number"
                                        fieldIcon="dollar"
                                        
                                        required={true}
                                    />
                                    <LabeledInput
                                        labelText="ISBN"
                                        name="isbn"
                                        
                                        value={book.isbn}
                                        fieldIcon="hash"
                                    />
                                    <LabeledInput
                                        labelText="Description"
                                        name="description"
                                        value={book.description}
                                        inputType="textarea"
                                        divType="full-width"
                                    />
                                    {/* 
                                    
                                    <LabeledInput
                                        labelText="ISBN"
                                        name="isbn"
                                        value={book.isbn}
                                        fieldIcon="hash"
                                        />
                                    
                                    <LabeledInput
                                        labelText="Number of Pages"
                                        name="pages"
                                        value={book.pages}
                                        inputType="number"
                                    />
                                    
                                    */
                                    }
                                    <div className="mobile-buttons full-width">
                                        <button
                                            type="button"
                                            className="header-btn cancel-btn"
                                            style={{
                                                padding: "10px 20px",
                                                backgroundColor: "white",
                                                color: "#f97316",
                                                border: "1px solid #ffce79",
                                                borderRadius: "10px",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            style={{
                                                padding: "10px 20px",
                                                background: "linear-gradient(to right, #f97316, #f59e0b)",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "10px",
                                                fontWeight: "500",
                                                cursor:"pointer",
                                            }}
                                        >
                                            
                                            Save Changes
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}




//My Structure for clear view


//         <div className="editbook-form-container">
//             <div className="edit-form-header-continer">

//             </div>

//             <form action="">
//             <div className="edit-form-details-grid">
//                 <div className="image-section" >

//                 </div>
//                 <div className="editdetails-input-sections">
//                 <div className="details-input-subs">

//                     <div className="section-title">
//                      <h3>
//                     Basic Information
//                     </h3>
//                     </div>
//                     <div className="input-grid">

//                         </div>
//                 </div>
//                 <div className="details-input-subs">
//                     <div className="section-title">

//                     </div>
//                     <div className="input-grid">

//                     </div>
//                 </div>

//                 </div>
//             </div>
//             </form>
//         </div>
//         </>