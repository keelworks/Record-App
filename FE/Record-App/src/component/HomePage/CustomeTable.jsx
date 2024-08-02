import { TableBody, TableContainer, TableHead, TableRow, Table, styled, TableCell, Paper, tableCellClasses } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";
import ParticipantRecordApp from './ParticipantRecordApp';



const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  borderRadius: "24px",
  overflow: "hidden",
  fontFamily: "Montserrat, sans-serif",
  letterSpacing: "2px"


}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  // margin: '10px 20px',
  border: '1px solid black',
  borderRadius: '25px',
  fontFamily: "Montserrat, sans-serif",
  letterSpacing: "2px",
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '10px auto',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: '10px',

  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0D5299",
    color: theme.palette.common.white,
    fontSize: 24,
    letterSpacing: "2px",
    // fontWeight: 100,     

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: "#D2EBFA",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));

const CustomeTable = ({ data, participant, project_name }) => {
  const navigate = useNavigate()
  const handleClick = (project_name, i) => {
    navigate("/participantApp", { state: { project_name } });

  }
  const handleParticipant = (participant, i) => {
    navigate("/profile", { state: { participant } })

  }
  return (
    <div className="overflow-x-auto">
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="customized table">
          <TableHead>
            {project_name ?
              <TableRow>
                <StyledTableCell align="center">No</StyledTableCell>
                <StyledTableCell align="center">Full Name</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
              </TableRow>
              :
              <TableRow>
                <StyledTableCell align="center">No</StyledTableCell>
                <StyledTableCell align="center">Project Name</StyledTableCell>
                <StyledTableCell align="center">Stage</StyledTableCell>
                <StyledTableCell align="center">Project Manager</StyledTableCell>
              </TableRow>
            }

          </TableHead>
          <TableBody>
            {

              project_name ?
                participant?.map((participant, index) => (
                  <StyledTableRow className='cursor-pointer' onClick={() => handleParticipant(participant, index)}>
                    <StyledTableCell align='center' >{ }</StyledTableCell>
                    <StyledTableCell align='center'>{participant.First_Name}</StyledTableCell>
                    <StyledTableCell align='center'>{participant.project.role}</StyledTableCell>
                    <StyledTableCell align='center'>{participant.Email_id}</StyledTableCell>
                  </StyledTableRow>

                ))
                :

                data?.map((project, index) => (
                  <StyledTableRow onClick={() => handleClick(project.Project_Name, index)} className='cursor-pointer'>
                    <StyledTableCell align='center' >{project.Project_id}</StyledTableCell>
                    <StyledTableCell align='center'>{project.Project_Name}</StyledTableCell>
                    <StyledTableCell align='center'>{project.Stage}</StyledTableCell>
                    <StyledTableCell align='center'>{project.Project_manager}</StyledTableCell>
                  </StyledTableRow>
                ))
            }
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  )
}

export default CustomeTable