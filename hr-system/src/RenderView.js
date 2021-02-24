import React,{useEffect, useState} from 'react'
import { useStateValue } from './StateProvider';
import axios from './axios'
import HrView from './HrView'
import ManagerView from './ManagerView'
import {Link} from 'react-router-dom'
import EmpView from './EmpView'
import Login from './Login';

function RenderView() {
    const[{user},dispatch] = useStateValue()
    const[{userDetails}] = useStateValue([])
 const[AllUsersDetails] = useStateValue([])
    console.log("userrrrrrrrr",user);
  
    
    // var userType = userDetails.map(function(m) {    
    //         return m.user_type
    // })
    // console.log("abc",userType);
       
   
//    console.log("details",userType );
useEffect(() => {
   
    async function getData()
    {
        const request = await axios.get(`/getUserDetails?username=${user}`)

           dispatch({
               type: 'SET_USER_DETAILS',
               userDetails: request.data
           })
           
           return request
    }
    getData()
    
       
},[user])

useEffect(() => {
     async function getAllData()
            {
            const request = await axios.get(`/getAllUsers`)
                console.log(request.data);
               dispatch({
                   type: 'SET_ALL_USER_DETAILS',
                   AllUsersDetails: request.data
               })
               
               return request
         
            }
            getAllData()
          
}, [])
    const url = 'http://localhost:3000/login'
    return (
        <div className="renderView">
            {
                user==null && 
                <Login />
            }
            {
              userDetails && userDetails.map((m) => (
                 
                m.user_type=='hr'?
                <HrView />
                : 
                [
                    m.user_type=='manager'?
                    
                         <ManagerView />
                        :
                         [
                            m.user_type=='emp'?
                            
                            <EmpView />
                            :
                         <Link to="/"><button>Go to HOme</button></Link>
                     ]
                    
                ]
              ))
              

              
        
            //    userType=='hr'?
            //     <HrView />
            //     : 
            //     [
            //         userType=='manager'?
                    
            //              <ManagerView />
            //             :
            //              [
            //                 userType=='emp'?
                            
            //                 <EmpView />
            //                 :
            //              <Link to="/"><button>Go to HOme</button></Link>
            //          ]
                    
            //     ]

            } 
            
           
        </div>
    )
}

export default RenderView
