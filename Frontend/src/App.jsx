import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route,Routes} from "react-router-dom"
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Components/Dashboard'
import NewBook from './Components/BookComponents/NewBook'
import LandingPage from './Components/LandingPage'
import Login from './Components/AuthComponents/Login'
import Signup from './Components/AuthComponents/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/home/*" element={<Dashboard/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </>
  )
}

export default App
