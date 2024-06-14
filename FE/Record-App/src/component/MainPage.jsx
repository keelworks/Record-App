import React from 'react'
import SideBar from './HomePage/SideBar'
import Header from './HomePage/Header'
import Main from './HomePage/Main'


const MainPage = () => {
 
  return (
    <>
      <div className='flex min-h-screen'>
        <div className='min-w-40 lg:w-1/5 border-r border-[#729BC7] flex-shrink-0 '>
          <SideBar />
        </div>
        <div className='w-4/5  relative'>
          <div className='fixed top-0 left-50 w-full h-44  lg:h-28 bg-white border-b border-[#729BC7]'>
            <Header />

          </div>
          <div className='mt-44 lg:mt-28 '>
            <div className='mt-8 h-3/6'>
           <Main/> 
          

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default MainPage