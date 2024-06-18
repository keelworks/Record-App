import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './component/LoginPage'
import HomePage from './component/HomePage/HomePage'
import Login from './component/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './component/HomePage/NoPage'
import ParticipantRecordApp from './component/HomePage/ParticipantRecordApp'
import Profile from './component/HomePage/Profile'
import MainPage from './component/HomePage/MainPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route index element={<Login/>} />
        <Route path='/home' element={<HomePage />} /> 
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/participantApp" element={<ParticipantRecordApp />} />
        <Route path="*" element={<NoPage />} />
    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
