import React from 'react'
import axios from './axios'
import { useStateValue } from './StateProvider'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
 
function EmpView() {
    const[{userDetails} , dispatch] = useStateValue()
    const refresh=() => {
      window.location.reload();
    }
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
          
        },
      }))(TableCell);

      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      
      function createData(name, points) {
        return { name, points  };
      }
      
      
  const useStyles = makeStyles({
    table: {
     
      maxWidth:700
      
    },
  });

    
    console.log(userDetails);
    const classes = useStyles();
    const rows = [
        createData('Attendance',  userDetails.map(function(m) { return m.points.attendance})),
        createData('Late coming', userDetails.map(function(m) { return m.points.late_coming})),
        createData('Behavior', userDetails.map(function(m) { return m.points.behavior})),
        createData('Work', userDetails.map(function(m) { return m.points.work})),
        createData('Culture', userDetails.map(function(m) { return m.points.culture})),
      ];
      const uname =userDetails.map(function(m) { return m.name})
    return (
      
        <div className="empView">
           
            <h1> Points Info of {uname}</h1>
            <TableContainer  align="center">
      <Table className={classes.table}  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Categories</StyledTableCell>
            <StyledTableCell align="right">Points</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.points}</StyledTableCell>
              
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Link to='/'> <Button variant="contained" onClick={refresh} color="primary">
                 Log Out
                </Button>
            </Link>
        </div>
        
    )
}

export default EmpView
