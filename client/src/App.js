import React from 'react';
import './App.css';
import Home from './Routes/Home';
import Nav from './Routes/Nav';
import SignUp from './Routes/SignUp';
import Rank from './Routes/Rank';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
  const array = [ 5, 3, 10, 1, 26, 4];


  //Used to sort ELO rating off each image
  function insertionSort (arrayList){
        let arrayLength = arrayList.length;
        let temp = 0;
        let j = 0;

        for(let i = 1; i<arrayLength; i++ ){
          while(arrayList[i-j-1] < arrayList[i-j]){
            temp = arrayList[i-j-1];
            arrayList[i-j-1] = arrayList[i-j];
            arrayList[i-j] = temp;
            j++;
          }
          j=0;
        }

        return arrayList;
    }

  console.log("Before sort: " + array);

  insertionSort(array);
  console.log("After sort: " + array);


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
