import "./ImageUpload.css"
import { useRef, useState } from "react"
import fileUploadIcon from "../assets/file (1).png"
import DeleteIcon from "../assets/crossicon.png"
import {Slide, ToastContainer,toast} from 'react-toastify'


export default function ImageUpload({ fileRef, textToDisplay, onFileSelect ,externalStyles={}}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileRefInternal = useRef(null)
  const assignedFileRef = fileRef || fileRefInternal
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
      if (onFileSelect) onFileSelect(file)
    }
  }

  const processFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result)
      }
      try{

        toast.success('File Uploaded')
        reader.readAsDataURL(file)
      }
      catch(err){
        console.log(err)
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processFile(files[0])
      if (onFileSelect) onFileSelect(files[0])

      if (assignedFileRef.current) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(files[0])
        assignedFileRef.current.files = dataTransfer.files
      }
    }
  }

  const handleFileRemove = () => {

    setSelectedImage(null)
    if (fileRef && fileRef.current) {
      fileRef.current.value = ""
    }

    if (typeof onFileSelect === "function") {
      onFileSelect(null)
    }
    toast.error('File Removed')
  }

  return (
    <>
      <div className={`fileupload-container-copy ${isDragging ? "dragging" :""}`} style={externalStyles}>

        { selectedImage &&(    <div className="remove-img" onClick={handleFileRemove}></div>)}
        <label
          htmlFor="book-image-file"
          className={`fileupload-container `}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            margin: "2px 6px",
            background: selectedImage ? `url(${selectedImage}) center/contain no-repeat` : "transparent",
          }}
        >
          {!selectedImage && (
            <>
              <div className="upload-icon">
                <img src={fileUploadIcon} alt="Upload icon" width={35} height={35} />
              </div>
              <div className="upload-text">{textToDisplay}</div>
              <div className="upload-hint" >Drag & drop or click to browse</div>
            </>
          )
          }
        </label>
        <input
          type="file"
          name="bookImage"
          ref={assignedFileRef}
          id="book-image-file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
          disabled={selectedImage}
        />
      </div>
    </>
  )
}

