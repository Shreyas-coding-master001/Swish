import { useState } from 'react'
import LandingPage from './Components/LandingPage'
import HomePage from './Components/HomePage'
import SignUp from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import './App.css'
import {Routes, Route} from 'react-router-dom'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signup" element={<SignIn />}/>
      </Routes>
    </main>
  )
}

export default App
