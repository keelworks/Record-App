import React from 'react'
import SideBar from './HomePage/SideBar'
import Header from './HomePage/Header'
import Main from './HomePage/Main'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ParticipantProfile = () => {
 
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

               
            
          

            </div>
            <div className='grid lg:grid-cols-1  h-full mb-10'>

            <div className='ml-2 mt-6 md:ml-8 sm:mr-2 mr-2 flex'>

            {/* Contact table*/}
            <div className='border rounded-2xl flex flex-col  border-black w-3/5   h-full md:mt-0 lg:mt-0 sm:w-full mr-10 '>
            <div className='bg-[#0D5299] p-4 text-left text-white font-normal text-lg tracking-wider rounded-t-2xl '>
                Basic, Contact Info
                <FontAwesomeIcon icon={faEdit} style={{color: "#ffffff", float: "right"}}/>
                </div>
            <div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
                <div style={{ marginLeft: '20px' }}>Role</div>
                <div style={{ marginRight: '20px' }}>Project Manager</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Email</div>
                <div style={{ marginRight: '20px' }}>Gaurav.Patil@keelworks.org</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Mobile</div>
                <div style={{ marginRight: '20px' }}>735-222-333</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Timezone</div>
                <div style={{ marginRight: '20px' }}>Pacific Time</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Address</div>
                <div style={{ marginRight: '20px' }}>San Francisco, CA, USA</div>
              </div>
              
            </div>
            </div>

                {/* Self Identity table */}
      <div className='border rounded-2xl flex flex-col  border-black w-3/5   h-full md:mt-0 lg:mt-0  mr-10'>
            <div className='bg-[#F29173] p-4 text-left text-white font-normal text-lg tracking-wider rounded-t-2xl '>
                Self Identify Data
                <FontAwesomeIcon icon={faEdit} style={{color: "#ffffff", float: "right"}}/>
                </div>
            <div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
                <div style={{ marginLeft: '20px' }}>Gender</div>
                <div style={{ marginRight: '20px' }}>Male</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Race/Ethnicity</div>
                <div style={{ marginRight: '20px' }}>Asian</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Visa Status</div>
                <div style={{ marginRight: '20px' }}>F1 OPT</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Veteran Status</div>
                <div style={{ marginRight: '20px' }}>Not a Veteran</div>
              </div>
              <div className='flex justify-between my-2 flex-col sm:flex-row items-center'>
              <div style={{ marginLeft: '20px' }}>Disability</div>
                <div style={{ marginRight: '20px' }}>N/A</div>
              </div>
              
            </div>
            </div>

            
            

            {/* second table end*/ }

          </div>

            </div>

        {/* Second Row */}
        <div className='border rounded-2xl  border-black mb-10 ml-8 mr-10  h-full md:mt-0 lg:mt-0  '>
            <div className='bg-[#3D965C] p-4 text-left text-white font-normal text-lg tracking-wider rounded-t-2xl '>
                Work background
                <FontAwesomeIcon icon={faEdit} style={{color: "#ffffff", float: "right"}}/>
                </div>
            <div>

              <div className='flex justify-between my-2  sm:flex-row items-center'>
                <div style={{ marginLeft: '20px' }}>Project Management Intern</div>
                <div >Indeed</div>
                <div style={{ marginRight: '20px' }}>July 2023 - Dec 2023</div>
              </div>
              <div className='flex justify-between my-2  sm:flex-row items-center'>
                <div style={{ marginLeft: '20px' }}>Project Management Co-op</div>
                <div >Northeastern University ITS</div>
                <div style={{ marginRight: '20px' }}>Feb 2023 - May 2023</div>
              </div>
              <div className='flex justify-between my-2  sm:flex-row items-center'>
                <div style={{ marginLeft: '20px' }}>Project Management Intern</div>
                <div >XY Education Foundation</div>
                <div style={{ marginRight: '20px' }}>Sept 2022 - Jan 2023</div>
              </div>
                   
        </div>
        </div>
        
        {/* Third Row */}

        <div className='border rounded-2xl  border-black mb-10 ml-8 mr-10  h-full md:mt-0 lg:mt-0  '>
            <div className='bg-[#8677A7] p-4 text-left text-white font-normal text-lg tracking-wider rounded-t-2xl '>
                Education
                <FontAwesomeIcon icon={faEdit} style={{color: "#ffffff", float: "right"}}/>
            </div>

            <div className='pb-2'>

              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div className='text-left pl-4'>Computer Science</div>
                <div className='text-center'>Master of Science</div>
                <div className='text-center'>Northeastern University</div>
                <div className='text-right pr-4'>Aug 2021 - Dec 2023</div>
              </div>
              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div className='text-left pl-4'>Economics</div>
                <div className='text-center'>Bachelor of Arts</div>
                <div className='text-center'>Purdue University</div>
                <div className='text-right pr-4'>Aug 2017 - May 2021</div>
              </div>
              
            </div>
        </div>

        {/*Forth Row*/}
        <div className='border rounded-2xl  border-black mb-10 ml-8 mr-10  h-full md:mt-0 lg:mt-0  '>
            <div className='bg-[#0D5299] p-4 text-left text-white font-normal text-lg tracking-wider rounded-t-2xl '>
                Team Assignment
                <FontAwesomeIcon icon={faEdit} style={{color: "#ffffff", float: "right"}}/>
            </div>

            <div className='pb-2'>

              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div className='text-left pl-4'>Participant Record App</div>
                <div className='text-center'>Project Manager</div>
                <div className='text-center'>In Progress</div>
                <div className='text-right pr-4'>Feb 2024 - Current</div>
              </div>
              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div className='text-left pl-4'>User Interview</div>
                <div className='text-center'>Project Manager</div>
                <div className='text-center'>Completed</div>
                <div className='text-right pr-4'>Dec 2023 - Jan 2024</div>
              </div>
              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div className='text-left pl-4'>Portfolio Review</div>
                <div className='text-center'>Project Manager</div>
                <div className='text-center'>Completed</div>
                <div className='text-right pr-4'>Oct 2023 - Nov 2023</div>
              </div>
              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div className='text-left pl-4'>Online Assessment Prep</div>
                <div className='text-center'>Project Manager</div>
                <div className='text-center'>Completed</div>
                <div className='text-right pr-4'>Sept 2023 - Oct 2023</div>
              </div>
              
            </div>
        </div>
        {/* Fifth Row */}

          </div>

        </div>
      </div>
    </>
  )
}

export default ParticipantProfile