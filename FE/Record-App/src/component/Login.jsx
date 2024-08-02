import React, { useContext, useEffect, useState } from 'react'
import Logo from "../assets/LOGO.png"
import google from '../assets/google-icon.png'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config/apiConfig';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';



const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const { setUser, user } = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    // Check if password length is at least 6 characters
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, {
        Email_id: email,
        Password: password,
      });

      const jwt = res?.data?.token

      if (jwt) {
        localStorage.setItem('jwt', jwt);
        let first_name = res?.data?.user.First_Name
        let last_name = res?.data?.user.Last_Name
        setUser({ email: email, name: first_name.charAt(0).toUpperCase() + first_name.slice(1), last: last_name.charAt(0).toUpperCase() + last_name.slice(1) });
        toast.success('Successfully logged in!');
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Incorrect email or password');
      } {
        setError('Login failed. Please try again.');
      }
    }
  }

  const handleGoogleClick = async () => {
    googleLogin()

  }
  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      const email = user.email;
      const emailDomain = email.split('@')[1];
      if (emailDomain==="keelworks.org") {
        const userDetails = result.user.displayName.split(' ')
        let first_name = userDetails[0].charAt(0).toUpperCase() + userDetails[0].slice(1)
        let last_name = userDetails[1].charAt(0).toUpperCase() + userDetails[1].slice(1)
        setUser({ email: result.user.email, name: first_name, last: last_name })
        toast.success("User login successfully")
        navigate("/home")

      }else{
        toast.error("Only keelworks.org email addresses are allowed.");
        // Optionally sign out the user if the email domain doesn't match
      }
    })
      .catch((err) => {
        toast.error(err)
      })

  }
  const handleForgetPassword = () => {
    navigate("/forget-password")

  }

  return (
    <div>
      <div className='flex flex-col w-full h-screen'>
        {/* Logo */}
        <div className='w-full  flex justify-center items-center h-2/6 ' >
          <div className='w-full max-w-md border-black rounded-md flex flex-col items-center justify-center  '>
            <div className='w-4/5 sm:w-4/5 md:w-full mb-6'>
              <img src={Logo} alt="Logo" className='w-60 sm:w-80 lg:w-[400px]' />
            </div>
          </div>
        </div>

        {/* Login details */}
        <form action="" onSubmit={handleSubmit}>
          <div className=' w-full flex justify-center items-center  h-2/3'>
            <div className='w-full max-w-md h-full border-black rounded-md flex flex-col items-center  '>
              <div className='w-4/5 mb-6 mt-4' >
                <label htmlFor="" className='text-[16px] text-[#000000] '>Enter your email</label>
                <input type="text" name="email" placeholder='demo@gmail.com' className='w-full border rounded-md p-4 border-black focus:outline-none mt-2 
            text-[#B1BECD] text-[18px]' />
              </div>
              <div className='w-4/5 mb-6' >
                <label htmlFor="" className='text-[16px] text-[#000000]'>Enter your password</label>
                <input type="password" name="password" placeholder='*************' className='w-full border text-[#B1BECD] rounded-md p-4 border-black focus:outline-none  mt-2  text-[18px]' />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              {/* Login Button */}
              <div className='w-4/5 mb-2' >
                <button className='w-full border rounded-md p-4 bg-[#1160B3] text-white text-[16px] '>Log in</button>
              </div>

              <div className='w-4/5 mb-4' >
                <a className='w-full p-2  text-[16px] font-semibold text-[#1160B3] underline block cursor-pointer' onClick={handleForgetPassword}>Forgot Your Password</a>
              </div>
              {/* Forgot Password Form */}

              {/* Or */}
              <div className='w-4/5 flex justify-between items-center mb-2' >
                <div className='w-full h-[1px] bg-[#134C88]'></div>
                <p className='text-[24px] mx-4 text-[#000000]'>or</p>
                <div className='w-full h-[1px] bg-[#134C88]'></div>
              </div>

              {/* Continue with Google */}
              <div className='w-4/5 flex border rounded-md p-3 border-black items-center justify-between mb-6 mt-8 cursor-pointer' onClick={handleGoogleClick}>
                <div className=' w-1/5 sm:text-sm flex justify-end mr-4 '>
                  <img src={google} alt="Google logo" />
                </div>
                <div className='w-4/5 ml-4 text-[16px] '>
                  <p>Continue with Google</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login