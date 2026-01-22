import { useState } from 'react'
import LandingPage from './Components/LandingPage'
import HomePage from './Components/HomePage'
import SignUp from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Profile from "./Components/Profile"
import Community from './Components/Community'
import Discuss from "./pages/CommunityPages/Discuss";
import Feed from "./Components/Feed.jsx";
import People from "./pages/People/People";
import Create from "./pages/CommunityPages/Create";

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Feed />} />
          {/* <Route index element={<div />} /> */}
            <Route path="profile" element={<Profile />}/>
            <Route path="community"element={<Community/>}>
              <Route path='Discuss' element={<Discuss />} />
              <Route path='Create' element={<Create />} />
            </Route>
            <Route path="people" element={<People/>} /> 
          {/* <Route path="card" element={<Card/>}/> */}
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </main>
  )
}

export default App
