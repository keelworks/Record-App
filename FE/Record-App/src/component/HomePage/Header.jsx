import React from 'react'
import search from '../../assets/search.png'
import avatar from '../../assets/avatar.png'
import { Avatar } from '@mui/material'

const Header = () => {
  return (
  
    <div className='flex md:flex-col lg:flex-row flex-col   bg-white fixed w-4/5 lg:mt-8  '>
      <div className='w-3/4 ml-2 sm:ml-4 lg:w-3/5 xl:w-3/4'>
        <div className='w-4/5  border rounded-md border-gray-200 m-4 p-3 flex'>
          <div>
          <img src={search} alt="" className='w-[25px] h-[25px]' />
          </div>
          <div className='w-4/5  ml-2'>
          <input type="text"  placeholder='Search here' className='border-none focus:outline-none text-[20px]'/>
          </div>
        </div>

      </div>
      <div className='w-1/4 flex md:mt-1  ml-2 sm:ml-4 lg:w-2/5 xl:w-1/4'>
        <div className='sm:mb-2 ml-2 lg:ml-0' >
        <Avatar alt="Remy Sharp" src={avatar}  sx={{ width: 56, height: 56 }}/>
        </div>
        <div className='ml-2 text-black'>
          <p className='font-semibold lg:text-[24px] md:text-xl sm:text-sm'>Anna Taylor</p>
          <p className='text-base sm:text-[16px] mt-0'>annataylor@keelworks.com</p>
        </div>

      </div>
    </div>
  )
}

export default Header