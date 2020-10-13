import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';

const Rank = () => {
    const [users, setUsers] = useState([]);

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


    function randomImage(arrayList){
        let arrayLength = arrayList.length;
        console.log(arrayLength)
        return arrayLength;
    }  

    return (
        <div className="row">
            <div className="column" >
              {users.slice(1,2).map((user) => {                 
              return(
                <div key={user._id} className="rank-choice">                  
                  <h4>{user.name} {user.rating}</h4>
                  <img className = "rank-images" src= {`/uploads/${user.image}`} alt=""/>
                </div>
              )     
            })}
            </div>
            <div className="column rank-OR" >
                <h2>OR</h2>
            </div>
            <div className="column">
            {users.slice(2,3).map((user) => {                 
              return(
                <div key={user._id} className="rank-choice">                  
                  <h4>{user.name} {user.rating}</h4>
                  <img className = "rank-images" src= {`/uploads/${user.image}`} alt=""/>
                </div>
              )     
            })}
            </div>
        </div>
    );
}

export default Rank;