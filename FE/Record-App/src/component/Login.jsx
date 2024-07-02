import React from 'react'
import Logo from "../assets/LOGO.png"
import google from '../assets/google-icon.png'
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { API_BASE_URL } from '../config/apiConfig';
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault()
   
    const data=new FormData(e.currentTarget)
        const userData={           
            email:data.get("email"),
            password:data.get("password"),
        }
        try {
          const res=await axios.post(`${API_BASE_URL}/auth/signin`,userData)
          const user=res.data
          if(user?.jwt){
              localStorage.setItem("jwt",user.jwt)
          }
          toast.success(" Successfully login  !");
          navigate("/home")
          
      } catch (error) {
          toast.error("User not found")
          
      }

  }

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // borderColor: 'black',
        border: "1px solid black",
        borderRadius: "8px",
        
      },
      '&:hover fieldset': {
        borderColor: 'black', // Border color on hover
      },
      '& .MuiInputBase-input': {
        color: '#B1BECD', // Text color
        fontSize: '18px', // Font size
      },
      '&.Mui-focused fieldset': {
        // borderColor: 'grey',
        border: "1px solid black", // Border color when focused
      },
    },
    '& .MuiInputBase-root': {
      '& input': {
        outline: 'none', // Removing default outline
      },
    },
  }));

  return (
    <div>

      <div className='flex flex-col w-full h-screen'>

        {/* Logo */}
        <div className='w-full  flex justify-center items-center h-2/6   '>
          <div className='w-full max-w-md border-black rounded-md flex flex-col items-center justify-center  '>
            <div className='w-4/5 sm:w-4/5 md:w-full mb-6'>
              <img src={Logo} alt="Logo" className='w-60 sm:w-80 lg:w-[400px]' />
            </div>
          </div>
        </div>

        {/* Login details */}
        <form action="" onSubmit={handleSubmit}>
          <div className=' w-full flex justify-center items-center  h-2/3  '>
            <div className='w-full max-w-md h-full border-black rounded-md flex flex-col items-center  '>

              {/* Email Input */}
              <div className='w-4/5 mb-6 mt-4'>
                <label htmlFor="" className='text-[16px] text-[#000000] '>Enter your email</label>
                {/* <input type="text" placeholder='demo@gmail.com' className='w-full border rounded-md p-4 border-black focus:outline-none mt-2 
            text-[#B1BECD] text-[18px]' /> */}
                <CustomTextField
                  required
                  id="email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  placeholder='Enter email'
                  autoComplete="off" 
                />
              </div>

              {/* Password Input */}
              <div className='w-4/5 mb-6'>
                <label htmlFor="" className='text-[16px] text-[#000000]'>Enter your password</label>
                {/* <input type="password" placeholder='*************' className='w-full border text-[#B1BECD] rounded-md p-4 border-black focus:outline-none  mt-2  text-[18px]' /> */}
                <CustomTextField
                  className='border rounded-md text-[#B1BECD]'
                  required
                  id="password"
                  name="password"
                  fullWidth
                  type="password"
                  placeholder='********'
                  autoComplete="off" 
                />

                
              </div>

              {/* Login Button */}
              <div className='w-4/5 mb-2'>
                {/* <button className='w-full border rounded-md p-4 bg-[#1160B3] text-white text-[16px] ' >Log in</button> */}
                <Button className=' bg-[#1160B3] w-full border rounded-md' type="submit" variant='contained' size='large' sx={{ padding: ".8rem 0", }}>
                  Login
                </Button>
              </div>


              <div className='w-4/5 mb-4'>
                <a className='w-full p-2  text-[16px] font-semibold text-[#1160B3] underline block'>Forgot Your Password</a>
              </div>
              {/* Or */}
              <div className='w-4/5 flex justify-between items-center mb-2'>
                <div className='w-full h-[1px] bg-[#134C88]'></div>
                <p className='text-[24px] mx-4 text-[#000000]'>or</p>
                <div className='w-full h-[1px] bg-[#134C88]'></div>
              </div>
              {/* Continue with Google */}
              <div className='w-4/5 flex border rounded-md p-3 border-black items-center justify-between mb-6 mt-8 cursor-pointer'>
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