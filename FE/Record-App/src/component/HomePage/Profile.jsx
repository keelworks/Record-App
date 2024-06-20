import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import edit from '../../assets/edit.png'
import edit2 from '../../assets/edit-2.png'
import download from '../../assets/download.png'
import download1 from '../../assets/download-1.png'
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import { Step, StepLabel, Stepper } from '@mui/material'
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';

import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import '../../App.css'

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <Check style={{ width: "20px", height: "20px", }} />
      ) : (
        <div className="QontoStepIcon-circle" />
      )
      }
    </ColorlibStepIconRoot>
  );
}
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active || ownerState.completed ? '#0D5299' : (theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#e0e0e0'),
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',

  '& .QontoStepIcon-completedIcon': {
    color: 'white',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#0D5299',

  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: ownerState.active ? 'white' : 'black',


  },

}));
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#0D5299',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));


const Profile = ({ activeStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Start');
  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting: isLoading,
    duration: 1,
    start: 0,
    end: 25,
    onComplete: () => {
      setIsLoading(false);
      setButtonLabel('Reset');
    },
  });
  const steps = [
    "Onboarding",
    "Training",
    "Resume Update",
    "Project Assignment",
    "job Hunting",
    "Interviews",
  ]
  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: 75,
  });

  const handleButtonClick = () => {
    if (isLoading) {
      setIsLoading(false);
      setButtonLabel('Start');
      resetValue1();
    } else if (buttonLabel === 'Reset') {
      setButtonLabel('Start');
      resetValue1();
    } else {
      setIsLoading(true);
      setButtonLabel('Reset');
    }
  };
  return (
    <div className='flex min-h-screen '>
      <div className='min-w-40 lg:w-1/5 border-r border-[#729BC7] flex-shrink-0 '>
        <SideBar />
      </div>
      <div className='w-4/5 relative'>
        <div className='fixed top-0 left-50  w-full bg-white border-b border-[#729BC7] h-16p sm:h-1/5 lg:h-17p xl:h-16p justify-center items-center z-10'>
          <Header />
        </div>
        <div className='mt-52 sm:mt-48 md:mt-40 h-auto w-full  '>
          <div className='h-auto text-[16px] text-black   w-full  '>
            <p className='md:ml-8 p-4 '>Record App / Participants Profile</p>
          </div>
          <div className='flex flex-col md:flex-row lg:flex-row items-center justify-between w-full  mb-8 h-auto  '>
            <div className='w-full md:w-3/5 lg:w-3/5 mt-4 lg:mt-0 md:mx-8 '>
              <span className='font-semibold text-3xl sm:text-3xl lg:text-[40px] text-black' ><FontAwesomeIcon icon={faLessThan} className='text-black w-[24px] h-[24px] mr-3 mb-1' />
                Gaurav Patil</span>
            </div>
            <div className='flex w-full md:w-2/5 lg:w-2/5  justify-start items-center text-center md:justify-center lg:justify-center mt-4 md:mt-0  ml-8'>
              <div className='bg-[#0D5299] w-[100px] md:w-[208px] flex justify-center items-center border rounded-lg h-[56px] mr-4'>
                <div className='mt-1  mr-1 md:mr-3'>
                  <img src={download1} alt="" className='w-[24px] h-[24px]' />
                </div>
                <div>
                  <span className='text-white text-[15px] md:text-[20px]'>Resume</span>
                </div>
              </div>
              <div className='bg-[#5DAE6F] w-[88.5px] flex justify-center items-center border rounded-lg h-[56px] mr-4'>
                <img src={edit} alt="" className='w-[24px] h-[24px]' />
              </div>
              <div className='bg-[#EE8A8A] w-[88.5px] flex justify-center items-center border rounded-lg h-[56px]'>
                <img src={download} alt="" className='w-[24px] h-[24px]' />
              </div>
            </div>
          </div>
          <div className='w-full my-14 '>
            <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label} >
                  <StepLabel StepIconComponent={ColorlibStepIcon} sx={{
                    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel':
                    {
                      fontFamily: "Montserrat, sans-serif",
                      color: "black",
                      fontSize: "16px",// Just text label (COMPLETED)
                    },
                  }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

          </div>

          <div className='grid lg:grid-cols-1  h-auto mb-10 w-full '>
            <div className='ml-2 md:mx-8 flex flex-col lg:flex-row'>
              {/* Contact table*/}
              <div className='border rounded-2xl flex flex-col mr-8  border-black w-full lg:w-3/5   h-full md:mt-0  '>
                <div className='bg-[#0D5299] p-4 text-left text-white font-normal  text-[18px] md:text-[24px] tracking-wider rounded-t-2xl '>
                  Basic, Contact Info
                  {/* <FontAwesomeIcon icon={faEdit} style={{ color: "#ffffff", float: "right" }}  className="w-[24px] h-[24px]" /> */}
                  <img src={edit2} alt="" className='w-[24px] h-[24px]' style={{ color: "#ffffff", float: "right" }} />
                </div>
                <div className='text-[20px] text-black'>
                  <div className='flex justify-between flex-row  items-start md:items-center md:my-2 '>
                    <div style={{ marginLeft: '20px' }}>Role</div>
                    <div style={{ marginRight: '20px' }}>Project Manager</div>
                  </div>
                  <div className='flex justify-between flex-row  items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Email</div>
                    <div style={{ marginRight: '20px' }}>Gaurav.Patil@keelworks.org</div>
                  </div>
                  <div className='flex justify-between flex-row  items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Mobile</div>
                    <div style={{ marginRight: '20px' }}>735-222-333</div>
                  </div>
                  <div className='flex justify-between flex-row  items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Timezone</div>
                    <div style={{ marginRight: '20px' }}>Pacific Time</div>
                  </div>
                  <div className='flex justify-between flex-row  items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Address</div>
                    <div style={{ marginRight: '20px' }}>San Francisco, CA, USA</div>
                  </div>

                </div>
              </div>

              {/* Self Identity table */}
              <div className='border rounded-2xl flex flex-col  border-black lg:w-2/5 mt-2  h-full lg:mt-0   w-full'>
                <div className='bg-[#F29173] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                  Self Identify Data
                  <img src={edit2} alt="" className='w-[24px] h-[24px]' style={{ color: "#ffffff", float: "right" }} />
                </div>
                <div className='text-[20px] text-black'>
                  <div className='flex justify-between flex-row sm:flex-row items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Gender</div>
                    <div style={{ marginRight: '20px' }}>Male</div>
                  </div>
                  <div className='flex justify-between flex-row sm:flex-row items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Race/Ethnicity</div>
                    <div style={{ marginRight: '20px' }}>Asian</div>
                  </div>
                  <div className='flex justify-between flex-row sm:flex-row items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Visa Status</div>
                    <div style={{ marginRight: '20px' }}>F1 OPT</div>
                  </div>
                  <div className='flex justify-between flex-row sm:flex-row items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Veteran Status</div>
                    <div style={{ marginRight: '20px' }}>Not a Veteran</div>
                  </div>
                  <div className='flex justify-between flex-row sm:flex-row items-start md:items-center md:my-2'>
                    <div style={{ marginLeft: '20px' }}>Disability</div>
                    <div style={{ marginRight: '20px' }}>N/A</div>
                  </div>
                </div>
              </div>
              {/* second table end*/}
            </div>
          </div>
          {/* Second Row */}
          <div className='w-full '>
            <div className='border rounded-2xl  border-black mb-10 ml-2 md:mx-8 h-auto '>
              <div className='bg-[#3D965C] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                Work background
                <img src={edit2} alt="" className='w-[24px] h-[24px]' style={{ color: "#ffffff", float: "right" }} />
              </div>
              <div className='text-[20px] text-black'>

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
          </div>


          {/* Third Row */}
          <div className='w-full '>
            <div className='border rounded-2xl  border-black mb-10 ml-2 md:mx-8  h-auto  '>
              <div className='bg-[#8677A7] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                Education
                <img src={edit2} alt="" className='w-[24px] h-[24px]' style={{ color: "#ffffff", float: "right" }} />
              </div>

              <div className='pb-2 text-[20px] text-black'>

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
          </div>


          {/*Forth Row*/}
          <div className='w-full'>
            <div className='border rounded-2xl  border-black mb-10 ml-2 md:mx-8  h-auto md:mt-0 lg:mt-0 '>
              <div className='bg-[#0D5299] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                Team Assignment
                <img src={edit2} alt="" className='w-[24px] h-[24px]' style={{ color: "#ffffff", float: "right" }} />
              </div>

              <div className='pb-2 text-[20px] text-black'>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-2'>
                  <div className='text-left pl-4'>Participant Record App</div>
                  <div className='text-center'>Project Manager</div>
                  <div className='text-left pl-4 md:text-center md:pl-0'>In Progress</div>
                  <div className='text-center md:text-right md:pr-4'>Feb 2024 - Current</div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-2'>
                  <div className='text-left pl-4'>User Interview</div>
                  <div className='text-left md:text-center'>Project Manager</div>
                  <div className='text-left pl-4 md:text-center md:pl-0'>Completed</div>
                  <div className='text-left md:text-right md:pr-4'>Dec 2023 - Jan 2024</div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-2'>
                  <div className='text-left pl-4'>Portfolio Review</div>
                  <div className='text-start md:text-center'>Project Manager</div>
                  <div className='text-left pl-4 md:text-center md:pl-0'>Completed</div>
                  <div className='text-start md:text-right md:pr-4'>Oct 2023 - Nov 2023</div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-2'>
                  <div className='text-left pl-4'>Online Assessment Prep</div>
                  <div className='text-start md:text-center'>Project Manager</div>
                  <div className='text-left pl-4 md:text-center md:pl-0'>Completed</div>
                  <div className='text-start md:text-right md:pr-4'>Sep 2023 - Oct 2023</div>
                </div>

              </div>
            </div>
          </div>

          {/* Fifth Row */}
          {/* LMS Status */}
          <div className='w-full'>
            <div className=' mb-10 ml-2 md:mx-8  h-auto md:mt-0 lg:mt-0  '>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
                <div className='border rounded-2xl flex flex-col  border-black   h-auto sm:w-full  '>
                  <div className='bg-[#F29173] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                    LMS Status
                    <span style={{ color: "#ffffff", float: "right" }} >View all</span>
                  </div>
                  <div>
                    <div className='m-4'>
                      <span className='text-[24px] text-black '>Skill: Data Analysis</span>
                    </div>
                    <div className='p-6 flex justify-center items-center text-[20px] text-black  z-0'>
                      <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8} justifyContent="center" >
                        <Stack spacing={2}>
                          <CircularProgress size="lg" determinate value={value2} sx={{
                            "--CircularProgress-trackThickness": "20px",
                            "--CircularProgress-progressThickness": "20px",
                            "--CircularProgress-progressColor": "#F29173",
                            "--CircularProgress-size": "180px",

                          }} >
                            <Typography sx={{ fontSize: '32px', fontWeight: 'bold', color: "black", fontFamily: "Montserrat" }}>70%</Typography>
                          </CircularProgress>
                        </Stack>
                      </Stack>
                    </div>
                    <div className='flex flex-col  text-[16px] text-right mr-6 mb-6 text-black'>
                      <p className='font-semibold '>Instructor</p>
                      <p >Anna Tylor</p>
                    </div>

                  </div>
                </div>
                <div className='border rounded-2xl flex flex-col  border-black  h-auto sm:w-full  '>
                  <div className='bg-[#3D965C] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                    Barrier to employment
                  </div>
                  <div className='text-[20px] text-black custom-progress-bar'>
                    <div className='grid grid-cols-2 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Visa Restriction</div>
                      <div>
                        <Progress.Line percent={100} vertical={false} strokeColor="#3D965C"  /> </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Language Proficiency</div>
                      <div>
                        <Progress.Line percent={40} vertical={false} strokeColor="#3D965C" />
                      </div>
                    </div>

                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Financial Constraints</div>
                      <div>
                        <Progress.Line percent={60} vertical={false} strokeColor="#3D965C" />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Limited Professional Network</div>
                      <div>
                        <Progress.Line percent={80} vertical={false} strokeColor="#3D965C" />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Recognition of  Qualifications</div>
                      <div>
                        <Progress.Line percent={30} vertical={false} strokeColor="#3D965C" />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Lack Of Skills</div>
                      <div>
                        <Progress.Line percent={30} vertical={false} strokeColor="#3D965C" />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 my-2 items-center '>
                      <div style={{ marginLeft: '20px' }}>Experience Requirements</div>
                      <div>
                        <Progress.Line percent={70} vertical={false} strokeColor="#3D965C" />
                      </div>
                    </div>

                  </div>


                </div>
              </div>
            </div>
          </div>

          {/* last section */}
          <div className='w-full'>
            <div className='border rounded-2xl  border-black mb-10 ml-2 md:mx-8  h-auto md:mt-0 lg:mt-0 '>
              <div className='bg-[#8677A7] p-4 text-left text-white font-normal text-[24px] tracking-wider rounded-t-2xl '>
                History
              </div>

              <div className='pb-2'>
                <div className='p-6 text-[24px] text-black'>
                  <p>Gaurav Patil is an ambitious and highly qualified international student from Pune, India, holding a dual degree in Computer Science and an MBA from a prestigious U.S. university. </p>
                  <p >Despite his impressive academic credentials and successful track record of leading tech projects, he faces significant challenges in securing a Product Manager role in the U.S. due to visa sponsorship issues and intense competition favoring local candidates. Gaurav's journey highlights his resilience and unwavering determination to overcome the barriers faced by international professionals in the American job market.</p>

                </div>


              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile