import React from 'react'
import CustomeTable from './CustomeTable'
import edit from '../../assets/edit.png'
import download from '../../assets/download.png'

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
    <div>
       <div className='flex flex-col md:flex-row lg:flex-row items-center justify-between w-full mt-36 mb-12'>
        <div className='w-full md:w-3/5 lg:w-3/5 mt-4 md:mt-4 lg:mt-0 ml-8 sm:mt-4'>
        <span className='font-bold text-3xl sm:text-3xl lg:text-4xl xl:text-4xl' >Participants Record App</span>
        </div>
        <div className='flex w-full md:w-2/5 lg:w-2/5  justify-start items-center text-center md:justify-center lg:justify-center mt-4 md:mt-0 lg:mt-0 ml-8'>
          <div className='bg-[#5DAE6F] w-1/5 flex justify-center items-center border rounded-lg h-12 mr-4'>
            <img src={edit} alt="" className='w-6 h-6'  />
          </div>
          <div className='bg-[#EE8A8A] w-1/5 flex justify-center items-center border rounded-lg h-12'>
            <img src={download} alt="" />
          </div>
        </div>
    </div>
    <div><CustomeTable title={tableRecord}/></div>
      </div>
  )
}

export default ParticipantRecordApp