import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route,Routes} from "react-router-dom"
import viteLogo from '/vite.svg'
import './App.css'
import BooksDisplay from './Components/BooksDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<BooksDisplay/>}/>
      </Routes>
    </>
  )
}

export default App
