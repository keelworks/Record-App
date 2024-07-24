import React, { useState } from 'react'
import Logo from "../assets/LOGO.png"
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config/apiConfig';
import axios from 'axios';



const ForgetPassword = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState()
  const [error, setError] = useState('');
  const handleSendLink =async (e) => {
    e.preventDefault()
    if(!email){
      setError("Email is required")

    }
    try {
     await axios.post(`${API_BASE_URL}/api/forget-password`, {
        Email_id: email,
      }).then((res)=>{
        console.log("res",res.data);
        if(res.data.Status==="Success"){
          navigate("/")
        }      
    })
      
    } catch (error) {
      console.log(err);
     
    }

  }
  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <div className=' w-full flex justify-center items-center  h-2/3'>
          <div className='w-full max-w-md h-full border-black rounded-md flex flex-col items-center  '>
            {/* Logo */}
            <div className='w-full  flex justify-center items-center h-2/6 ' >
              <div className='w-full max-w-md border-black rounded-md flex flex-col items-center justify-center  '>
                <div className='w-4/5 sm:w-4/5 md:w-full mb-6'>
                  <img src={Logo} alt="Logo" className='w-60 sm:w-80 lg:w-[400px]' />
                </div>
              </div>
            </div>
            <div className='text-start'>
              <h1 className='text-3xl text-[#000000] font-bold '>Forget Password</h1>
              <div className='w-4/5 mb-2 mt-10'>
                <label htmlFor="" className='text-[16px] text-[#000000] '>Enter your email</label>
                <input type="text" name="email" placeholder='demo@gmail.com' className='w-full border rounded-md p-4 border-black focus:outline-none mt-2 
          text-[#B1BECD] text-[18px]' onChange={(e)=>setEmail(e.target.value)} />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className='w-4/5 mb-2 mt-6' >
                <button className='w-full border rounded-md p-4 bg-[#1160B3] text-white text-[16px] ' onClick={handleSendLink} >Send Link</button>
              </div>
              <div className='text-center w-4/5 mb-2 mt-5'>
              <button onClick={() => navigate("/")} className='text-[#1160B3]'>Cancel</button>

              </div>
            </div>
          </div>
        </div></div>

    </>
  )
}

export default ForgetPassword