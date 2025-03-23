import React from "react";
import Navbar from "./Navbar";
import BooksDisplay from "./BooksDisplay";
import "./dashboard.css"
export default function Dashboard(){
    return(
        <>
        <div className="dashboard">
            <Navbar/>
            <BooksDisplay/>
        </div>
        </>
    )
}