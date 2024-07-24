import './App.css'
import HomePage from './component/HomePage/HomePage'
import Login from './component/Login'
import ParticipantRecordApp from './component/HomePage/ParticipantRecordApp'
import Profile from './component/HomePage/Profile'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Error from './pages/Error'
import { UserProvider } from './context/userContext.jsx'
import ProtectedRoute from './component/ProtectedRoute.jsx'
import ForgetPassword from './component/ForgetPassword.jsx'
import ResetPassword from './component/ResetPassword.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/participantApp',
    element: (
      <ProtectedRoute>
        <ParticipantRecordApp />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forget-password',
    element: (
        <ForgetPassword />
    ),
  },
  {
    path: '/reset-password/:id/:token',
    element: (
      // <ProtectedRoute>
        <ResetPassword />
      // </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <main>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
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
