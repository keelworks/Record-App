import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './component/LoginPage'
import HomePage from './component/HomePage/HomePage'
import Login from './component/Login'
import ParticipantRecordApp from './component/HomePage/ParticipantRecordApp'
import Profile from './component/HomePage/Profile'
import MainPage from './component/HomePage/MainPage'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from './pages/Error'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/participantApp',
    element: <ParticipantRecordApp />,
  },
]);
function App() {
  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
