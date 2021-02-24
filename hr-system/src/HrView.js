import React,{useState} from 'react'
import { useStateValue } from './StateProvider'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import './HrView.css'
import axios from './axios'
import {Link} from 'react-router-dom'

function HrView() {
const[{AllUsersDetails}, dispatch] = useStateValue()

    const refresh=() => {
      window.location.reload();
    }
    const updateUser = (row)  => {
        console.log(row);
        axios.post('/updatePoints', {
            username: row.username,
            
                attendance : row.attendance,
                late_coming :row.late_coming,
                reason :row.reason,
                behavior :row.behavior,
                work :row.work,
                culture :row.culture
        
        })
        
        console.log("usernameeeee",row.username);
        alert("User Updated")
    }

    function addUser(id)
    {
        console.log("id",id);
    }

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
      
      function createData(name, attendance, late_coming, reason,behavior,work,culture,username) {
        return { name, attendance, late_coming, reason,behavior,work,culture,username };
      }
      
      
  const useStyles = makeStyles({
    table: {
     
      maxWidth:700
      
    },
  });

    
   
    const classes = useStyles();
    // const rows = [
    //     // createData('Attendance',  userDetails.map(function(m) { return m.points.attendance})),
    //     // createData('Late coming', userDetails.map(function(m) { return m.points.late_coming})),
    //     // createData('Behavior', userDetails.map(function(m) { return m.points.behavior})),
    //     // createData('Work', userDetails.map(function(m) { return m.points.work})),
    //     // createData('Culture', userDetails.map(function(m) { return m.points.culture})),
    //   ];

      const data =[]
      AllUsersDetails.map(function(m) {   
         data.push([m.name,m.points.attendance,m.points.late_coming,m.points.reason,
         m.points.behavior,
         m.points.work,
         m.points.culture,
         m.username
         ]) 
     }
     
     )
      console.log(data[0][1]);
      
       const rows = [];
       for(var i = 0; i<data.length; i++)
      {
         
              rows.push(createData(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4],data[i][5],data[i][6],data[i][7]))
          
      }
      console.log("object:",rows);

    
    return (
        <div className='hrView'>
            <h1>HR Points System</h1>
           
        {
            
            rows.map((row) => (
              
              <div className="hrView__row">  
                  <h3>{row.name}</h3> 
                    
                        <TextField id="outlined-basic" label="Attendance" variant="outlined" 
                        defaultValue={row.attendance}
                        onChange = {(e) => row.attendance =e.target.value}
                  
                  />
                  
                  
                  <TextField id="outlined-basic" label="Late Coming" variant="outlined" 
                  defaultValue={row.late_coming}
                  
                  onChange = {(e) => row.late_coming =e.target.value}
                  
                  />
                  <TextField id="outlined-basic" label="Reason" variant="outlined" 
                  defaultValue={row.reason}
                  onChange = {(e) => row.reason =e.target.value}
                  />
                  <TextField id="outlined-basic" label="Behavior" variant="outlined" 
                  defaultValue={row.behavior}
                  onChange = {(e) => row.behavior =e.target.value}
                  />
                  <TextField id="outlined-basic" label="Work" variant="outlined" 
                  defaultValue={row.work}
                  onChange = {(e) => row.work =e.target.value}
                  />
                  <TextField id="outlined-basic" label="Culture" variant="outlined" 
                  defaultValue={row.culture}
                  onChange = {(e) => row.culture =e.target.value}
                  />
                  <Button id={row.username}onClick={() => updateUser(row)}>Update</Button>
                 
                   </div>
                  
            ))
        }
          <Link to='/'> <Button variant="contained" color="primary" onClick={refresh}>
                 Log Out 
                </Button>
            </Link>
        
        </div>
       
    )
}

export default HrView
