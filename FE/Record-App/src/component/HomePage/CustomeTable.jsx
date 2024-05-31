import { TableBody, TableContainer, TableHead, TableRow ,Table, styled, TableCell, Paper, tableCellClasses} from '@mui/material'
import React from 'react'


const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  borderRadius:"23px",
  overflow:"hidden",
  fontFamily:"Montserrat, sans-serif",
  letterSpacing:"2px"
  
  
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '70%',
  margin: '10px 30px',
  border: '1px solid black',
  borderRadius: '25px',
  fontFamily: "Montserrat, sans-serif",
  letterSpacing:"2px",
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
    fontSize:20,
    letterSpacing:"2px",
    // fontWeight: 100, 
    
    
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor:"#D2EBFA",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const CustomeTable = ({title}) => {
  console.log("🚀 ~ CustomeTable ~ title:", title[0])
  return (
    <div className=''>
       <StyledTableContainer component={Paper}  >
      <StyledTable  aria-label="customized table">
        <TableHead>
          <TableRow>
            {title.map((d)=>(             
               <StyledTableCell align="left">{d.label}</StyledTableCell>
              )
            )}
           
          </TableRow>
        </TableHead>
        <TableBody>
       
          {title[0].name?.map((_,index)=>(           
             <StyledTableRow key={index}>
              {title.map((d)=>(
                <StyledTableCell key={d.label + index}>{d.name[index]}</StyledTableCell>
              ))}
             </StyledTableRow>

          ))}
        </TableBody>
      </StyledTable >
    </StyledTableContainer>
    </div>
  )
}

export default CustomeTable