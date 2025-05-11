import { useEffect, useRef, useState } from "react";
import "./EditBook.css";
import { useParams } from "react-router-dom"
import ImageUpload from "./ImageUpload";
import sampleImg from "/Hobbit_.jpg"
import { toast, ToastContainer } from "react-toastify";
import saveIcon from "../assets/saveicon (2).png"
import bookInfoIcon from "../assets/open-book.png"
import moreInfoIcon from "../assets/document.png"
import bookCoverIcon from "../assets/bookcover.png"
import axios from "axios";
import { BASE_URL } from "../configs/Urls";
// import publicationinfo from "../assets/publication.png"

const LabeledInput = ({
    labelText,
    name,
    value="",
    inputType = "text",
    divType = "",
    fieldIcon = "",
    options = [],
    placeholder = "",
    required = false,
    setBook,
}) => {
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setBook(prev => ({
                ...prev,
                [name]: value
            }));
        };
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
export default function EditBookPage() {
    const [book, setBook] = useState({
        
    });
    const [oldDetails,setOldDetails]=useState({})
    const [changesMade,setChangesMade]=useState(0)
    const {bkid} = useParams()

    useEffect(() => {
        async function fetchAllBookDetails() {
            try{
                const response=await axios.get(`${BASE_URL}/book/${bkid}`)
                if (response.statusText==="OK" && response.data){
                    setBook(response.data)
                    setOldDetails(response.data)
                    console.log("here",oldDetails)
                }
                console.log("here2:",oldDetails)
                
                console.log(response)
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBookDetails()
        console.log("here4",oldDetails)
    }, [changesMade])

    const fileInputRef = useRef();
    const goBack=()=>{
        try{

            history.go(-1)
        }
        catch(err){
            toast.info("There was some problem going back")
            console.log(err)
        }
    }
    const isImageSelected=()=>Boolean(fileInputRef.current.files[0]);
    const haveDetailsChanged=()=>{
        console.log("image:",isImageSelected())
        return ( isImageSelected() || JSON.stringify(book)!=JSON.stringify(oldDetails) )
        
    }

    const getChangedObject=()=>{
        const updatedObj={}
        for (let i in oldDetails){
            if (oldDetails[i] != book[i] ){
                updatedObj[i]=book[i]
            }
        }
        return updatedObj
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //I have to make an object of only changes inputs
            if(haveDetailsChanged()){
                const formData = new FormData()
                const updatedObj=getChangedObject()
                console.log(updatedObj)
                console.log("book:",book)
                if(updatedObj.price){
                    updatedObj.price=parseInt(updatedObj.price)
                }
                formData.append("documentj",JSON.stringify(updatedObj))

                if (isImageSelected()){
                    formData.append("file",fileInputRef.current.files[0])
                    const filename=updatedObj["name"] || oldDetails.name
                    formData.append("filename",filename)
                }
                console.log(formData)
                const response=await axios.put(`${BASE_URL}/book/${bkid}`,formData,)
                console.log(response)
                toast.success("Book details saved successfully!",{autoClose:800,});
            }
            else{
                console.log("No changes Detected !")
                toast.info("No changes Detected !")
                
            }
        }
        catch(err){
            toast.error("Update Failed !")
            console.log(err)
        }
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
                        <button type="button"
                            onClick={goBack}
                        className="header-btn cancel-btn">
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
                        <button type="button" className="header-btn save-btn" onClick={(e)=>{
                            toast.promise(
                                handleSubmit(e),{pending:"Processing your request",},
                            {autoClose:800,})
                        }}>
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
                                    Existing Book Image
                                </h3>
                                <div className="book-image-container">
                                    <div className="book-image">
                                        <img src={`${BASE_URL}/${book.imagepath}` || "/placeholder.svg"} alt="Prev image" />
                                    </div>
                                </div>
                                <ImageUpload fileRef={fileInputRef} externalStyles={{ height: "160px", margin: "12px 0px" }} textToDisplay="Upload New Image Here" />
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
                                        name="name"
                                        setBook={setBook}
                                        value={book.name}
                                        divType="full-width"
                                        required={true}
                                    />

                                    <LabeledInput
                                        labelText="Author"
                                        name="author"
                                        setBook={setBook}
                                        value={book.author}
                                        fieldIcon="user"
                                        divType="full-width"
                                        required={true}
                                    />

                                    <LabeledInput
                                        labelText="Publisher"
                                        name="publication"
                                        setBook={setBook}
                                        value={book.publication}
                                        required={true}
                                    />

                                    

                                    <LabeledInput
                                        labelText="Genre"
                                        name="genre"
                                        setBook={setBook}
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
                                    <h3>Additional Details</h3>
                                </div>
                                <div className="input-grid">
                                    <LabeledInput
                                        labelText="Price (₹)"
                                        name="price"
                                        setBook={setBook}
                                        value={book.price}
                                        inputType="number"
                                        fieldIcon="dollar"
                                        
                                        required={true}
                                    />
                                    <LabeledInput
                                        labelText="ISBN"
                                        name="isbn"
                                        setBook={setBook}

                                        value={book.isbn}
                                        fieldIcon="hash"
                                    />
                                    <LabeledInput
                                        labelText="Description"
                                        name="summary"
                                        setBook={setBook}
                                        value={book.summary}
                                        inputType="textarea"
                                        divType="full-width"
                                    />
                                    {/* 
                                    
                                   
                                    
                                    <LabeledInput
                                        labelText="Number of Pages"
                                        name="pages"
                                        setBook={setBook}
                                        value={book.pages}
                                        inputType="number"
                                    />
                                    
                                    */
                                    }
                                    <div className="mobile-buttons full-width">
                                        <button
                                                onClick={goBack}type="button"

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
            <ToastContainer position="top-center" theme="colored" autoClose={1800}/>
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