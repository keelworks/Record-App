import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import MainPage from './MainPage'

const HomePage = () => {
 
  return (
    <>
      <div className='flex min-h-screen'>
        <div className='min-w-40 lg:w-1/5 border-r border-[#729BC7] flex-shrink-0 '>
          <SideBar />
        </div>
        <div className='w-4/5  relative'>
          <div className='fixed top-0 left-50 w-full h-15p sm:h-1/5 lg:h-17p xl:h-16p  bg-white border-b border-[#729BC7] justify-center items-center'>
          
            <Header />

          </div>
          <div className='mt-48 lg:mt-36 lg:h-85p h-4/5 '>
          <MainPage/>
          </div>

        </div>
      </div>
    </>
  )
}

export default HomePage