import React from 'react'
import homeLogo from '../../assets/home-logo.png'
import {useNavigate} from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()
  return (
    <div className='flex  h-full flex-col fixed '>
      <div className='m-2 h-2/4 md:m-2 xl:m-8 lg:m-4'>
        <div className=''>
          <img src={homeLogo} alt="" className='w-2/4 h-1/2  lg:w-3/4 lg:h-3/4' />
        </div>
        <div className='mt-8'>
          <ul className='font-sans  text-[#000000] lg:text-[24px] text-[20px]'>
            <li className='mt-2 cursor-pointer' onClick={()=>navigate("/home")}>Home Page</li>
            <li className='mt-2 cursor-pointer' onClick={()=>navigate("/profile")}>All team</li>
            <li className='mt-2 cursor-pointer' onClick={()=>navigate("/participantApp")}>All Participants</li> 
          </ul>
        </div>
      </div>
      <div className=' h-2/4  flex  items-end '>
        <div className='flex flex-col lg:w-3/5 xl:w-3/4 2xl:w-full items-left ml-4 sm:w-1/2 text-[16px]'>
          <div className='w-3/5 sm:w-full  bg-[#1160B3] rounded-md text-white p-3  text-center  my-4 '>
            <button >Add New Participants</button>
          </div>
          <div className='w-3/5 sm:w-full  bg-[#1160B3] rounded-md text-[#FFFFFF] p-3  text-center my-4'>
            <button >Data Exports</button>
          </div>
          <div className='w-3/5 sm:w-full border-[#1160B3] border rounded-md text-[#000000] p-3  text-center my-4 '>
            <button >Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar