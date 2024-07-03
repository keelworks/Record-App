import React from 'react'
import CustomeTable from './CustomeTable'
import edit from '../../assets/edit.png'
import download from '../../assets/download.png'
import SideBar from './SideBar'
import Header from './Header'

const ParticipantRecordApp = () => {
  const tableRecord = [
    {
      label: "No",
      name: [1, 2, 3, 4, 5]
    },
    {
      label: "FullName",
      name: ["Gaurav Patil", "Amit Sharma", "Priya Singh", "Rahul Verma", "Sneha Mehta"]
    },
    {
      label: "Role",
      name: ["Project Manager", "Developer", "Designer", "Tester", "Analyst"]
    },
    {
      label: "Email",
      name: ["gaurav.patil@keelworks.org", "amit.sharma@keelworks.org", "priya.singh@keelworks.org", "rahul.verma@keelworks.org", "sneha.mehta@keelworks.org"]
    }
  ];

  return (

    <div className='flex min-h-screen'>
      <SideBar />
      <div className='w-full relative'>
        <div className='fixed top-0 left-50 w-full h-16p md:h-1/5 lg:h-16p justify-center items-center  border-b border-[#729BC7] '>
          <Header />
        </div>
        <div className='mt-48 lg:mt-40 lg:h-85p h-auto w-full'>
          <div className='mx-[4rem] mt-8 '>
            <div className='flex flex-col md:flex-row lg:flex-row items-center justify-between w-full mb-10 p-4'>
              <div className='w-full md:w-3/5 lg:w-3/5 mt-4'>
                <span className='font-semibold text-3xl lg:text-[40px] text-black'>
                  Speaking Improvement Project
                </span>
              </div>
              <div className='flex w-full md:w-2/5 lg:w-2/5 justify-start items-center text-center md:justify-end lg:justify-end mt-4'>
                <div className='bg-[#5DAE6F] w-[89px] h-[48px] flex justify-center items-center border rounded-lg mr-4'>
                  <img src={edit} alt='Edit' className='w-[24px] h-[24px]' />
                </div>
                <div className='bg-[#EE8A8A] w-[89px] h-[48px] flex justify-center items-center border rounded-lg'>
                  <img src={download} alt='Download' className='w-[24px] h-[24px]' />
                </div>
              </div>
            </div>
            <div className='w-full overflow-x-auto'>
              <CustomeTable title={tableRecord} />
            </div>
          </div>
        </div>



      </div>
    </div>

  )
}

export default ParticipantRecordApp