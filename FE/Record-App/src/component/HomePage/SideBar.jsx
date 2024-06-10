import React from 'react'
import homeLogo from '../../assets/home-logo.png'

const SideBar = () => {
  return (
    <div className='flex  h-screen flex-col fixed '>
      <div className='m-8 h-2/4 md:m-4 xl:m-8 lg:m-8'>
        <div className=''>
          <img src={homeLogo} alt="" className='w-2/4 h-1/2  lg:w-3/4 lg:h-3/4' />
        </div>
        <div className='mt-8'>
          <ul className='md:text-lg font-sans sm:text-sm'>
            <li className='mt-2'>Home Page</li>
            <li className='mt-2'>All team</li>
            <li className='mt-2'>All Participants</li> 
          </ul>
        </div>
      </div>
      <div className=' h-2/4  flex  items-end'>
        <div className='flex flex-col md:w-2/5 lg:w-3/5 xl:w-3/4 2xl:w-full items-left ml-6 sm:w-2/5'>
          <div className='w-3/5 sm:w-full md:w-full lg:w-full bg-[#1160B3] rounded-md text-white p-3  text-center  my-4 '>
            <button >Add New Participants</button>
          </div>
          <div className='w-3/5 sm:w-full md:w-full  bg-[#1160B3] rounded-md text-white p-3  text-center my-4'>
            <button >Data Exports</button>
          </div>
          <div className='w-3/5 sm:w-full md:w-full border-[#1160B3] border rounded-md text-black p-3  text-center mt-4 mb-8 '>
            <button >Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar