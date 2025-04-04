import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route,Routes} from "react-router-dom"
import viteLogo from '/vite.svg'
import './App.css'
import BooksDisplay from './Components/BooksDisplay'
import Dashboard from './Components/Dashboard'
import NewBook from './Components/NewBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="" style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center"}}>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>

        <Route path="/addbook" element={<NewBook/>}/>
      </Routes>
        </div>
    </>
  )
}

export default App
