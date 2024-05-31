import React from 'react'
import search from '../../assets/search.png'
import avatar from '../../assets/avatar.png'
import { Avatar } from '@mui/material'

const Header = () => {
  return (
  
    <div className=' flex md:flex-col lg:flex-row flex-col sm:h-auto  bg-white fixed w-4/5 '>
      <div className='w-3/4 ml-4 lg:w-3/5 xl:w-3/4'>
        <div className='w-4/5  border rounded-md border-gray-200 m-4 p-3 flex'>
          <div>
          <img src={search} alt="" className='w-6 h-6' />
          </div>
          <div className='w-4/5  ml-2 mt-1'>
          <input type="text"  placeholder='Search here' className='border-none focus:outline-none'/>
          </div>
        </div>

      </div>
      <div className='w-1/4 flex md:mt-4 ml-4 lg:w-2/5 xl:w-1/4'>
        <div className='sm:ml-6 sm:mb-2' >
        <Avatar alt="Remy Sharp" src={avatar}  sx={{ width: 56, height: 56 }}/>
        </div>
        <div className='ml-2'>
          <p className='font-bold lg:text-2xl md:text-xl sm:text-sm'>Anna taylor</p>
          <p className='text-base sm:text-xs'>annataylor@keelworks.com</p>
        </div>


      </div>
    </div>
  )
}

export default Header