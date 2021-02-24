import React,{useEffect} from 'react'
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

function ManagerView() {
  const refresh=() => {
    window.location.reload();
  }
    const[{userDetails}] = useStateValue([])
    const[{user}] = useStateValue()
    const[{AllUsersDetails},dispatch] = useStateValue()
    console.log(AllUsersDetails);
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
      
      function createData(name, attendance, late_coming, reason,behavior,work,culture) {
        return { name, attendance, late_coming, reason,behavior,work,culture };
      }
     
     
     const data =[]
     AllUsersDetails.map(function(m) {   
        data.push([m.name,m.points.attendance,m.points.late_coming,m.points.reason,
        m.points.behavior,
        m.points.work,
        m.points.culture
        ]) 
    }
    
    )
     console.log(data[0][1]);
     
      const rows = [];
      for(var i = 0; i<data.length; i++)
     {
        
             rows.push(createData(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4],data[i][5],data[i][6]))
         
     }
      
      const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
      });
    //console.log(user);
        // useEffect(() => {
        //     async function getAllData()
        //     {
        //     const request = await axios.get(`/getAllUsers`)
        //         console.log(request.data);
        //        dispatch({
        //            type: 'SET_ALL_USER_DETAILS',
        //            AllUsersDetails: request.data
        //        })
               
        //        return request
         
        //     }

        // getAllData()
        // },[])
        const classes = useStyles();

        return (
        <div className="managerView">
            <h1 align="center">Manager view</h1>
            
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="right">Attendance</StyledTableCell>
            <StyledTableCell align="right">Late Coming&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Reason&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Behavior&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Work&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Culture&nbsp;</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.attendance}</StyledTableCell>
              <StyledTableCell align="right">{row.late_coming}</StyledTableCell>
              <StyledTableCell align="right">{row.reason}</StyledTableCell>
              <StyledTableCell align="right">{row.behavior}</StyledTableCell>
              <StyledTableCell align="right">{row.work}</StyledTableCell>
              <StyledTableCell align="right">{row.culture}</StyledTableCell>
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

export default ManagerView
