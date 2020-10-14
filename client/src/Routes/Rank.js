import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';

const Rank = () => {
    const [users, setUsers] = useState([]);
    const arrayLength = users.length;
    var random1 = 0;
    var random2 = 0;

    useEffect(() => {
        async function getUsers() {
          try {
            const response = await axios.get("http://localhost:3030/api/users");
            setUsers(response.data);
            console.log("Got users from database!");
          } catch(error) {
            console.log('error', error);
          }
        }        
        getUsers();
    }, []);

    function randomImage(arrayLength){
      let randomIndex = Math.floor(Math.random() * arrayLength);
      return randomIndex;
    }

    function randomComparison(num1, num2){
      let rand1 = num1;
      let rand2 = num2;
      if(rand1 === rand2 && (rand1 || rand2)<(arrayLength-1) && (rand1 || rand2) >0){
        //console.log(`Between)Before comparison:  ${rand1}  ${rand2}`);
        rand2 = rand2-1;
        //console.log(`Between)Before comparison:  ${rand1}  ${rand2}`);
      }
      else if(rand1 === rand2 && (rand1 && rand2)===0){
        //console.log(`0)Before comparison:  ${rand1}  ${rand2}`);
        rand2 = rand2 + 1 +(Math.floor(Math.random() * (arrayLength-1)));
        //console.log(`0)After comparison:  ${rand1}  ${rand2}`);
      }
      else if(rand1 === rand2 && (rand1 && rand2)===(arrayLength-1)){
        //console.log(`Max)Before comparison:  ${rand1}  ${rand2}`);
        rand2 = rand2 - 1 -(Math.floor(Math.random() * (arrayLength-1)));
        //console.log(`Max)After comparison:  ${rand1}  ${rand2}`);
      }
      return rand2;
    }

    random1= randomImage(arrayLength);
    random2= randomImage(arrayLength);

    if(random1 === random2 ){
      random2 = randomComparison(random1, random2);
    }

    const imageClick = () => {
      window.location.reload();
    } 

    /*useEffect(() => {
      if(random1 !== random2){
        console.log(`${random1} ${random2}`);
        console.log("WORKS!");
      }
      else if(random1 === random2){
        console.log("ERROR!");
      }
      console.log("--------------");
    });*/

    return (
        <div className="row">
            <div className="column" >
              {users.slice(random1,random1+1).map((user) => {                 
              return(
                <div key={user._id} className="rank-choice">                  
                  <h4>{user.name} {user.rating}</h4>
                  <img 
                    onClick={() => imageClick()}
                    className = "rank-images" 
                    src= {`/uploads/${user.image}`} 
                    alt=""
                  />
                </div>
              )     
            })}
            </div>
            <div className="column rank-OR" >
                <h2>OR</h2>
            </div>
            <div className="column">
            {users.slice(random2, random2+1).map((user) => {                 
              return(
                <div key={user._id} className="rank-choice">                  
                  <h4>{user.name} {user.rating}</h4>
                  <img 
                    onClick={() => imageClick()}
                    className = "rank-images" 
                    src= {`/uploads/${user.image}`} 
                    alt=""
                  />
                </div>
              )     
            })}
            </div>
        </div>
    );
}

export default Rank;