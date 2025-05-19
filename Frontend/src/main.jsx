import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import NewBook from './Components/BookComponents/NewBook.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
     {/* <div style={{display:"block",width:"100%",minHeight:"100vh",alignContent:"center",margin:"0 auto",padding:"1px 5px",paddingBottom:"12px"}}>
    </div> */}
    <App />
   {/* <EditBookPage/>
     <NewBook/> 
     */}
    </BrowserRouter>
  // {/* </StrictMode>, */}
)
