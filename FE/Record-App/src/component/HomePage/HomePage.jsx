import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import MainPage from './MainPage'

const HomePage = () => {
 
  return (
    <>
      <div className='flex min-h-screen'>
          <SideBar />
        <div className='w-4/5  relative'>
          <div className='fixed top-0 left-50 w-full h-16p sm:h-1/5 lg:h-17p xl:h-16p  bg-white border-b border-[#729BC7] justify-center items-center'>          
            <Header />
          </div>
          <MainPage/>
        </div>
      </div>
    </>
  )
}

export default HomePage