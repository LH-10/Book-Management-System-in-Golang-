import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { BASE_URL } from "../../configs/Urls"
import "./DeletePopup.css" 
import { useNavigate } from "react-router-dom"

export default function DeletePopup({ book , openstates}) {
  const [isOpen, setIsOpen] = openstates || useState()
  const modalRef = useRef(null)
  const navigate=useNavigate()
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    if (isOpen) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleDeleteClick = async () => {
    try {
      
      await axios.delete(`${BASE_URL}/book/${book.id}`)
      toast.success("Book Record Deleted",{autoClose:1000,onClose:(()=>{window.location.assign("/home/dashboard")})})
      setIsOpen(false)
      
    } catch (error) {
      console.error(error)
      toast.error("Could not delete")
    }
  }

  return (
    <>
    <div className="delete-popup-c">
     

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
              
                <h2 className="modal-title">Confirm Deletion</h2>
                <span className="modal-description" style={{}}>

                <span className="modal-description">
                  Are you sure you want to delete this book with the title </span>
                  <span className="modal-description" style={{fontWeight:"600",textDecoration:"underline",wordBreak:"break-word",fontSize:"16px"}}>
                    {book.name}
                    </span> 
                   <span> ? This action cannot be undone.</span>
                </span>
                
              </div>
              <div className="modal-footer">
                <button className="confirm-button" onClick={handleDeleteClick}>
                  Yes, Delete
                </button>
                <button className="cancel-button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      <ToastContainer position="top-center" theme="colored" autoClose={1000}/>
      </>
  )
}
