import { useEffect, useRef, useState } from "react";
import "./EditBook.css";
import {useParams} from "react-router-dom"
import ImageUpload from "./ImageUpload";
import sampleImg from "/Hobbit_.jpg"
import { toast } from "react-toastify";

export default function EditBookPage() {
    const [book, setBook] = useState({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publication: "Scribner",
        publicationDate: "1925-04-10",
        price: 12.99,
        description: "A novel of mystery and tragedy set in the Roaring Twenties, The Great Gatsby follows the story of the wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        isbn: "9780743273565",
        pages: 180,
        genre: "Classic Fiction",
        status: "active"
    });

    useEffect(()=>{
        async function fetchAllBookDetails(){
            const bkid=useParams('id')
        }
        fetchAllBookDetails()
    },[])

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
                    {/* Icon will be imported and placed here */}
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
                            {/* <!-- Cancel icon will go here --> */}
                            Cancel
                        </button>
                        <button type="button" className="header-btn save-btn">
                            {/* <!-- Save icon will go here --> */}
                            Save Changes
                        </button>
                    </div>
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <div className="edit-form-details-grid">
                        <div className="image-section">

                            <div class="book-cover-container">
                                <h3>
                                    Existing Book Cover 
                                </h3>
                                <div class="book-image-container">
                                    <div class="book-image">
                                        <img src={sampleImg || "/placeholder.svg"} alt="Prev image" />
                                    </div>
                                </div>
                                <ImageUpload externalStyles={{ height: "160px", margin: "12px 0px" }} textToDisplay="Upload New Image Here" />
                            </div>
                        </div>
                        <div className="editdetails-input-sections">
                            <div className="details-input-subs">
                                <div className="section-title">
                                    {/* <!-- Book icon will go here --> */}
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
                                        required={true}
                                    />

                                    <LabeledInput
                                        labelText="Publisher"
                                        name="publication"
                                        value={book.publication}
                                        required={true}
                                    />

                                    <LabeledInput
                                        labelText="Publication Date"
                                        name="publicationDate"
                                        value={book.publicationDate}
                                        inputType="date"
                                        fieldIcon="calendar"
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
                                    {/* <!-- FileText icon will go here --> */}
                                    <h3>Additional Details</h3>
                                </div>
                                <div className="input-grid">
                                <LabeledInput
                                        labelText="Price ($)"
                                        name="price"
                                        value={book.price}
                                        inputType="number"
                                        fieldIcon="dollar"
                                        divType="full-width"
                                        required={true}
                                        />
                                    <LabeledInput
                                        labelText="ISBN"
                                        name="isbn"
                                        divType="full-width"
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