import React from 'react';
import './App.css';
import Home from './Routes/Home';
import Nav from './Routes/Nav';
import SignUp from './Routes/SignUp';
import Rate from './Routes/Rate';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App = () => {
  //Used to sort ELO rating off each image
  return(
    <Router>
      <div className='contact-form'>
        <div id='body'>
            <Nav/>
            <Switch>
              <Route path="/" render={()=> <Home />} exact/>
              <Route path="/SignUp" render={()=> <SignUp />} exact/>
              <Route path="/Rate" render={()=> <Rate />} exact/>
            </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
