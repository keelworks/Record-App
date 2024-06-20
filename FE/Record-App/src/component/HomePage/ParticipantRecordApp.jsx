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
      <div className='min-w-40 lg:w-1/5 border-r border-[#729BC7] flex-shrink-0 '>
        <SideBar />
      </div>
      <div className='w-4/5  relative'>
        <div className='fixed top-0 left-50 w-full h-16p sm:h-1/5 lg:h-17p xl:h-16p justify-center items-centerbg-white border-b border-[#729BC7]'>
          <Header />

        </div>
        <div className='mt-48 lg:mt-40 lg:h-85p h-4/5 '>
            <div className='mt-8'>
              <div className='flex flex-col md:flex-row lg:flex-row items-center justify-between w-full  mb-12'>
                <div className='w-full md:w-3/5 lg:w-3/5 mt-4 ml-8 '>
                  <span className='font-semibold text-3xl  lg:text-[40px] text-black' >Speaking Improvement Project</span>
                </div>
                <div className='flex w-full md:w-2/5 lg:w-2/5  justify-start items-center text-center md:justify-center lg:justify-center mt-4  ml-8'>
                  <div className='bg-[#5DAE6F] w-[89px] h-[48px] flex justify-center items-center border rounded-lg  mr-4'>
                    <img src={edit} alt="" className='w-[24px] h-[24px]' />
                  </div>
                  <div className='bg-[#EE8A8A] w-[89px] h-[48px] flex justify-center items-center border rounded-lg '>
                    <img src={download} alt="" className='w-[24px] h-[24px]'/>
                  </div>
                </div>
              </div>
              <div><CustomeTable title={tableRecord} /></div>
            </div>

          </div>

      </div>
    </div>

  )
}

export default ParticipantRecordApp