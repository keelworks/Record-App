import React from 'react'
import Logo from "../assets/LOGO.png"
import google from '../assets/google-icon.png'

const LoginPage = () => {
  return (
    <div>

      <div className='flex flex-col md:flex-row w-full h-screen'>
        {/* Left Side */}
        <div className='md:w-1/2 bg-[#D2EBFA] flex justify-center items-center p-4'>
          <img src={Logo} alt="Logo" className='w-60 md:w-80 lg:w-96' />
        </div>

        {/* Right Side */}
        <div className='md:w-1/2 flex justify-center items-center mt-6 '>
          <div className='w-full max-w-md h-4/5 border-black rounded-md flex flex-col justify-center items-center sm:mx-4 mx-4'>
            {/* Continue with Google */}
            <div className='w-full flex border rounded-md p-3 border-black items-center justify-between mb-4'>
            <div className=' w-1/5 sm:text-sm flex justify-end mr-4 '>
                <img src={google} alt="" />
              </div>
              <div className='w-3/4 ml-4 md:text-base sm:text-sm'>
                <p>Continue with Google</p>
              </div>
            </div>

            {/* Or */}
            <div className='w-full flex justify-between items-center mb-4'>
              <div className='w-full h-[1px] bg-[#134C88]'></div>
              <p className='text-sm md:text-base mx-4'>or</p>
              <div className='w-full h-[1px] bg-[#134C88]'></div>
            </div>

            {/* Email Input */}
            <div className='w-full mb-6'>
              <label htmlFor="" className='text-sm md:text-base '>Enter your Email</label>
              <input type="text" placeholder='demo@gmail.com' className='w-full border rounded-md p-2 border-black focus:outline-none mt-2' />
            </div>

            {/* Password Input */}
            <div className='w-full mb-6'>
              <label htmlFor="" className='text-sm md:text-base'>Enter your password</label>
              <input type="password" placeholder='*************' className='w-full border rounded-md p-2 border-black focus:outline-none  mt-2' />
            </div>

            {/* Login Button */}
            <div className='w-full mb-6'>
              <button className='w-full border rounded-md p-2 bg-[#1160B3] text-white text-sm md:text-base'>Login</button>
            </div>

            {/* Forgot Password Button */}
            <div className='w-full mb-4'>
              <button className='w-full border rounded-md p-2 border-[#1160B3] text-black text-sm md:text-base'>Forgot Your Password</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex w-full h-screen'>
        <div className='w-1/2 bg-[#D2EBFA] flex justify-center items-center'>
          <div className='h-auto w-auto items-center sm:m-8 '>
            <img src={Logo} alt="" className='sm:w-60px sm:h-60px md:w-100px md:h-80px  lg:w-200px lg:h-100px' />
          </div>
        </div>
        <div className='w-1/2 flex justify-center items-center'>
          <div className='w-2/4 h-4/5  border-black rounded-md  flex items-center justify-center flex-col'>
            <div className=' w-4/5 flex border rounded-md p-3 border-black items-center justify-between m-4'>
              <div className=' w-1/5 sm:text-sm flex justify-end mr-4 '>
                <img src={google} alt="" />
              </div>
              <div className='w-3/4 ml-4 md:text-base sm:text-sm'>
                <p>Continue with Google</p>
              </div>
            </div>

            <div className=' w-4/5 flex items-center justify-between m-4 '>
              <div className='flex-1'>
                <div className='h-px bg-[#134C88]'></div>
              </div>
              <div className='px-4 md:text-2xl mb-2 sm:text-sm'>or</div>
              <div className='flex-1'>
                <div className='h-px bg-[#134C88]'></div>
              </div>
            </div>
            <div className='items-start w-4/5 flex sm:text-sm md:text-base '>
              <label htmlFor="">Enter your Email</label>
            </div>
            <div className=' w-4/5 border rounded-md p-3 border-black  m-2 sm:text-sm md:text-base'>
              <input type="text" placeholder='demo@gmail.com' className='border-none focus:outline-none w-full' />
            </div>
            <div className='items-start w-4/5 flex mt-2 sm:text-sm md:text-base'>
              <label htmlFor="">Enter your password</label>
            </div>
            <div className=' w-4/5 border rounded-md p-3 border-black  m-2 sm:text-sm md:text-base'>
              <input type="password" placeholder='*************' className='border-none focus:outline-none w-full' />
            </div>

            <div className=' w-4/5 border rounded-md p-3 bg-[#1160B3]  m-2 text-center sm:text-sm md:text-base'>
             <button className='text-white '>Login</button>
            </div>
            <div className=' w-4/5 border rounded-md p-3 border-[#1160B3]  m-2 text-center sm:text-sm md:text-base'>
             <button className='text-black '>Forgot Your Password</button>
            </div>
          </div>
          

        </div>
      </div> */}

    </div>
  )
}

export default LoginPage