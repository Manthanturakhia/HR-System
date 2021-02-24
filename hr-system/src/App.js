import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import { useStateValue } from './StateProvider'
import RenderView from './RenderView';
import EmpView from './EmpView'
import { Button } from '@material-ui/core';
function App() {
  const[{userDetails}] = useStateValue()
  return (
    <Router>
    <div className="app">
     
        <Switch>
        <Route path='/Register'>
          <Register />
        </Route>
        <Route path='/Login'>
          <Login />
        </Route>
        <Route path='/EmpView'>
          <EmpView />
        </Route>
        <Route path='/RenderView'>
          <RenderView />
        </Route>
        <Route path='/'>
          <div className="app__container">
            <h1 align="center">Points System</h1>
              {/* <div className="app__button"> */}
                <Link to='/login'>
                  {/* <Button  variant="contained" >
                LOGIN
                </Button> */}
                <Button variant="contained" color="primary">
                 Login
                </Button>
                </Link>
                <br/>
                <br/>
              <Link to='/register'> <Button variant="contained" color="primary">
                 Register
                </Button>
            </Link>
              {/* </div> */}
        </div>
        </Route>
      </Switch>
     
    </div>
    </Router>
  );
}

export default App;
