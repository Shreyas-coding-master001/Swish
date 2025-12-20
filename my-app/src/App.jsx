import { useState } from 'react'
import LandingPage from './Components/LandingPage'
import HomePage from './Components/HomePage'
import './App.css'
import {Routes, Route} from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />}/>
        <Route path="/profile"></Route>
      </Routes>
    </main>
  )
}

export default App
