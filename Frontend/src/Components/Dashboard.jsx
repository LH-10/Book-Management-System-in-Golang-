import React from "react";
import Navbar from "./Navbar";
import BooksDisplay from "./BooksDisplay";
import "./dashboard.css"
import { Route, Routes } from "react-router-dom";
import NewBook from "./NewBook";
import EditBookPage from "./EditBookPage";
export default function Dashboard(){
    return(
        <>
        <div className="dashboard">
            <Navbar/>
          <Routes>

            <Route path="/dashboard" element={<BooksDisplay/>}/>
            <Route path="/addbook" element={<NewBook/>}/>
            <Route path="/editbook/:bkid" element={<EditBookPage/>}/>
          </Routes>
            
        </div>
        </>
    )
}