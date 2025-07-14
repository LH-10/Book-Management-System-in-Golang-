import React from "react";
import Navbar from "./Navbar";
import BooksDisplay from "./BookComponents/BooksDisplay";
import "./Dashboard.css"
import { Route, Routes } from "react-router-dom";
import NewBook from "./BookComponents/NewBook";
import EditBookPage from "./BookComponents/EditBookPage";
import ViewBookDetails from "./BookComponents/ViewBookDetails";
import { ToastContainer } from "react-toastify";
export default function Dashboard(){
    return(
        <>
        <div className="dashboard">
            <Navbar/>
          <Routes>

            <Route path="/dashboard" element={<BooksDisplay/>}/>
            <Route path="/dashboard/viewbook/:id" element={<ViewBookDetails/>}/>
            <Route path="/addbook" element={<NewBook/>}/>
            <Route path="/editbook/:bkid" element={<EditBookPage/>}/>
          </Routes>
            
        </div>

        </>
    )
}