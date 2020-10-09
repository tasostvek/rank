import React from 'react';
import './App.css';
import Home from './Routes/Home';
import Nav from './Routes/Nav';
import SignUp from './Routes/SignUp';
import Rank from './Routes/Rank';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
  return(
    <Router>
      <div className='contact-form'>
        <div id='body'>
          <Nav/>
          <Switch>
            <Route path="/" render={()=> <Home />} exact/>
            <Route path="/SignUp" render={()=> <SignUp />} />
            <Route path="/Rank" render={()=> <Rank />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
