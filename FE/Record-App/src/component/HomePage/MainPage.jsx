import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import CustomeTable from './CustomeTable'


const MainPage = () => {
  const tableRecord = [
    {
      label: "No",
      name: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      label: "ProjectName",
      name: ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5", "Project 6", "Project 7", "Project 8", "Project 9", "Project 10"]
    },
    {
      label: "Stage",
      name: ["In Progress", "Completed", "Not Started", "In Progress", "On Hold", "In Progress", "Completed", "On Hold", "In Progress", "Completed"]
    },
    {
      label: "ProjectManager",
      name: ["Gaurav Patil", "Amit Sharma", "Priya Singh", "Rahul Verma", "Sneha Mehta", "Heena Dhanani", "Filicity", "Kapil Gupta", "Manas Babar", "Thomas Garrod"]
    }
  ];

  return (
    <>

<div className='mt-48 lg:mt-40 lg:h-85p h-auto w-full'>
  <div className='mx-4 sm:mx-8 md:mx-[4rem] '>
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 h-full'>
      <div className='grid md:grid-rows-2 lg:grid-rows-2 gap-2 ml-0 '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full'>
          <div className='border rounded-2xl bg-[#0D5299] text-center text-white my-3 p-4 border-black w-full'>
            <p className='text-[40px] tracking-wider'>12</p>
            <p className='font-light text-[20px] mt-0 tracking-wider'>Projects</p>
            <a href="" className='text-[16px] underline tracking-wider hover:text-white'>See all</a>
          </div>
          <div className='border rounded-2xl bg-[#3D965C] text-center text-white my-3 p-4 border-black w-full'>
            <p className='text-[40px] tracking-wider'>12000</p>
            <p className='font-light mt-1 text-[20px] tracking-wider'>Participants</p>
            <a href="" className='text-[16px] underline tracking-wider hover:text-white'>See all</a>
          </div>
        </div>
        <div className='w-full '>
          <div className='border rounded-2xl flex flex-col border-black my-2 w-full'>
            <div className='flex flex-row bg-[#FCDB76] rounded-t-2xl w-full'>
              <div className='p-4 text-center font-normal text-[20px] tracking-wider w-1/2 flex justify-start ml-2 text-black'>04/20/2024</div>
              <a href="" className='w-1/2 flex justify-center p-4 text-[#134C88] underline tracking-wider text-[16px]'>Open Calendar</a>
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex justify-between m-2 w-full'>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <div className='text-[16px] text-[#000000] w-1/3'>9:00 am - 10:00 am</div>
                <div className='text-[16px] text-[#000000] w-2/3 overflow-wrap break-words'>Participant record app....</div>
              </div>
              <div className='flex justify-between m-2 w-full'>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className='text-[16px] text-[#000000] w-1/3'>9:00 am - 10:00 am</div>
                <div className='text-[16px] text-[#000000] w-2/3 overflow-wrap break-words'>Participant record app....</div>
              </div>
              <div className='flex justify-between m-2 w-full'>
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className='text-[16px] text-[#000000] w-1/3'>9:00 am - 10:00 am</div>
                <div className='text-[16px] text-[#000000] w-2/3 overflow-wrap break-words'>Participant record app....</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='ml-2 my-3'>
        <div className='border rounded-2xl flex flex-col border-black h-full md:mt-0 w-full '>
          <div className='bg-[#F29173] p-4 text-center font-normal text-[24px] text-black tracking-wider rounded-t-2xl w-full'>Participants who are not assigned</div>
          <div className='w-full'>
            <div className='flex justify-around my-2 flex-col sm:flex-row items-center text-[20px] text-black w-full'>
              <div>Participants 1</div>
              <div>Software Developer</div>
            </div>
            <div className='flex justify-around my-2 flex-col sm:flex-row items-center text-[20px] text-black w-full'>
              <div>Participants 2</div>
              <div>Software Developer</div>
            </div>
            <div className='flex justify-around my-2 flex-col sm:flex-row items-center text-[20px] text-black w-full'>
              <div>Participants 3</div>
              <div>Software Developer</div>
            </div>
            <div className='flex justify-around my-2 flex-col sm:flex-row items-center text-[20px] text-black w-full'>
              <div>Participants 4</div>
              <div>Software Developer</div>
            </div>
            <div className='flex justify-around my-2 flex-col sm:flex-row items-center text-[20px] text-black w-full'>
              <div>Participants 5</div>
              <div>Software Developer</div>
            </div>
            <div className='flex justify-around my-2 flex-col sm:flex-row items-center text-[20px] text-black w-full'>
              <div>Participants 6</div>
              <div>Software Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='mb-10'>
      <div className='my-8'>
        <span className='font-semibold lg:text-[48px] text-3xl sm:text-4xl md:text-5xl text-[#000000]'>Teams</span>
      </div>
      <div className='w-full'><CustomeTable title={tableRecord} /></div>
    </div>
  </div>
</div>



    </>
  )
}

export default MainPage