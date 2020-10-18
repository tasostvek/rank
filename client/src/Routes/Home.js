import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        console.log("Got users from database!");
      } catch(error) {
        console.log('error', error);
      }
    }      
    getUsers();
  }, []);

  const ratingArray = users.map(function(obj) {
    const container = {};

    container.name = obj.name;
    container.rating = obj.rating;

    return obj.rating;
  })

  function insertionSort (ratingList,userList){
    let arrayLength = ratingList.length;
    let tempRating = 0;
    let tempUser = 0
    let j = 0;

    for(let i = 1; i<arrayLength; i++){
      while(ratingList[i-j-1] < ratingList[i-j]){
        tempRating = ratingList[i-j-1];
        tempUser = userList[i-j-1];

        ratingList[i-j-1] = ratingList[i-j];
        userList[i-j-1] = userList[i-j];

        ratingList[i-j] = tempRating;
        userList[i-j] = tempUser;
        j++;
      }
      j=0;
    }

    return userList;
  }

  insertionSort(ratingArray,users)
  useEffect(() => {
    console.log(ratingArray)
  });

  return(
    <div>
        <div className="userImages">
          {users.map((user) => {                 
            return(
              <div key={user._id} className = "userName"> 
                <hr/>                   
                <h4 className = "userName-title">{users.indexOf(user)+1}) {user.name} {user.rating}</h4>
          
              </div>
            )     
          })}
        </div>
    </div>
  );
  /*<img className = "leaderboard-image" src= {`/uploads/${user.image}`} alt=""/>*/
}

export default Home;