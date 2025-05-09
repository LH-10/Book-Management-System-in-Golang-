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
      <Routes>
        <Route path="/home/*" element={<Dashboard/>}/>

      </Routes>
    </>
  )
}

export default App
