import { Button, InputLabel, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import axios from './axios'
import Login from './Login'
import {Link} from 'react-router-dom'
import './Register.css'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
function Register() {
    const[name, setName] = useState("")
    const[username, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const[user_type, setUsertype] = useState("")

    const register = () => {
        axios.post('/register', {
            name: name,
            username: username,
            password: password,
            user_type: user_type,
            points:{
                attendance : 1,
                late_coming :0,
                reason :"",
                behavior :1,
                work :1,
                culture :1
            }
        })
        if(username && user_type && password){
            alert("User Registered")
        }
        else{
            alert("Username/UserType/Password is required")
        }
        
        setName("")
        setPassword("")
        setUserName("")
        setUsertype("")
    }
    
    return (
        <div className="register">

            <div className="register__container">
                    <h1>REGISTER</h1>
                
                    <TextField id="standard-basic"  label="Name"   
                        placeholder="Name" 
                        value={name}
                        onChange = {(e) => setName(e.target.value)}/> 
                <TextField id="standard-basic"  label="Username"
                    placeholder="Username" 
                    value={username}
                    onChange = {(e) => setUserName(e.target.value)}/> 
                <TextField id="standard-basic" type="password" label="password" 
                    placeholder="Password" 
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}/> 
                {/* <TextField id="standard-basic"  label=" User type" 
                    placeholder="hr/emp/manager" 
                    value={user_type}
                    onChange = {(e) => setUsertype(e.target.value)}/>  */}
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select 
                    name="demo-simple-select-label"
                    id="demo-simple-select"
                   required
                   value={user_type}
                    onChange = {(e) => setUsertype(e.target.value)}
                >
                 <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="emp">EMPLOYEE</MenuItem>
                <MenuItem value="manager">MANAGER</MenuItem>
        </Select>
                  <br></br> 
                <Button variant="contained" onClick={register} color="primary">
                Register
                </Button>
                <Link to={{
                pathname:'/Login',
            }}>
            
            <br />
             <Button variant="contained" color="primary">
                 Login
                </Button>
            </Link>
            
            </div>
        </div>
    )
}

export default Register
