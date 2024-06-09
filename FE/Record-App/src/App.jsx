import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './component/LoginPage'
import HomePage from './component/HomePage/HomePage'
import Main from './component/HomePage/Main'
import MainPage from './component/MainPage'
import ParticipantProfile from './component/ParticipantProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>

    <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ParticipantProfile />} />
    </Routes>

    </BrowserRouter>
      {/* <LoginPage/> */}

      
    </>
  )
}

export default App
