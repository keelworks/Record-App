import React, { useContext } from 'react'
import homeLogo from '../../assets/home-logo.png'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import cookies from 'js-cookie'
import { UserContext } from '../../context/userContext'
import { auth } from '../firebase'

const SideBar = () => {
  const navigate = useNavigate()
  const {setUser}=useContext(UserContext)


  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user')
    auth.signOut()
    // cookies.remove('jwt')
    // cookies.remove('user')
    // cookies.remove('userEmail')
    setUser('')
    toast.success('Successfully logged out!');
    navigate('/'); // Redirect to the login page
  };
  return (
    <div className='min-w-40 lg:w-1/5 border-r border-[#729BC7] flex-shrink-0 '>
    <div className='flex h-full flex-col fixed '>
      <div className='m-2 h-2/4 xl:m-8 lg:m-4'>
        <div className=''>
          <img src={homeLogo} alt="" className='w-3/5 h-3/5  lg:w-3/4 lg:h-3/4 xl:w-full xl:h-full' />
        </div>
        <div className='mt-8'>
          <ul className='font-sans  text-[#000000] lg:text-[24px] text-[20px]'>
            <li className='mt-2 cursor-pointer' >Home Page</li>
            <li className='mt-2 cursor-pointer'>All team</li>
            <li className='mt-2 cursor-pointer' >All Participants</li> 
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
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SideBar