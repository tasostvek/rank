import React, {useState, useEffect} from 'react';
import {Image } from 'cloudinary-react';
import axios from 'axios';
import '../App.css';
import EloRating from 'elo-rating';


const Rank = () => {
    const [users, setUsers] = useState([]);
    const arrayLength = users.length;
    var random1 = 0;
    var random2 = 0;

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

    function randomImage(arrayLength){
      let randomIndex = Math.floor(Math.random() * arrayLength);
      return randomIndex;
    }

    function randomComparison(num1, num2){
      let rand1 = num1;
      let rand2 = num2;
      if(rand1 === rand2 && (rand1 || rand2)<(arrayLength-1) && (rand1 || rand2) >0){
        rand2 = rand2-1;
      }
      else if(rand1 === rand2 && (rand1 && rand2)===0){
        rand2 = rand2 + 1 +(Math.floor(Math.random() * (arrayLength-1)));
      }
      else if(rand1 === rand2 && (rand1 && rand2)===(arrayLength-1)){
        rand2 = rand2 - 1 -(Math.floor(Math.random() * (arrayLength-1)));
      }
      return rand2;
    }

    
    random1= randomImage(arrayLength);
    random2= randomImage(arrayLength);

    if(random1 === random2 ){
      random2 = randomComparison(random1, random2);
    }


    const ratingArray = users.map(function(obj) {
      const container = {};
  
      container.rating = obj.rating;
  
      return obj.rating;
    })


    const idArray = users.map(function(obj) {
      const container = {};
  
      container.rating = obj._id;
  
      return obj._id;
    })
  

    const imageClick = async (winner, loser, image) => {
      let result = EloRating.calculate(winner, loser);
      const ratingDataImage1 = new FormData();
      const ratingDataImage2 = new FormData();

      console.log("Winner: "+result.playerRating + 
        " Loser: " +result.opponentRating);

      if(image === 1){
        ratingArray[random1] = result.playerRating;
        ratingArray[random2] = result.opponentRating;
        console.log("Random1: "+ratingArray[random1] + 
          " Random2: " +ratingArray[random2]);

        ratingDataImage1.append("_id",idArray[random1]);
        ratingDataImage1.append("rating",ratingArray[random1]);
        ratingDataImage2.append("_id",idArray[random2]);
        ratingDataImage2.append("rating",ratingArray[random2]);

        try{
          await axios.post('/Rate',ratingDataImage1);
          await axios.post('/Rate',ratingDataImage2);
        }
        catch(err){
          if(err.response.status === 500){
              console.log('There was a problem with the server');
          }
          else{
              console.log(err.response.data.msg);
          }
        }
      }

      else if(image === 2){
        ratingArray[random2] = result.playerRating;
        ratingArray[random1] = result.opponentRating;
        console.log("Random2: "+ratingArray[random2] + 
          " Random1: " +ratingArray[random1]);
        
        ratingDataImage1.append("_id",idArray[random1]);
        ratingDataImage1.append("rating",ratingArray[random1]);
        ratingDataImage2.append("_id",idArray[random2]);
        ratingDataImage2.append("rating",ratingArray[random2]);

        try{
          await axios.post('/Rate',ratingDataImage1);
          await axios.post('/Rate',ratingDataImage2);
        }
        catch(err){
          if(err.response.status === 500){
              console.log('There was a problem with the server');
          }
          else{
              console.log(err.response.data.msg);
          }
        }
      }
      random1= randomImage(arrayLength);
      random2= randomImage(arrayLength);

      if(random1 === random2 ){
        random2 = randomComparison(random1, random2);
      }
    } 
    /*
    useEffect(() => {
      if(random1 !== random2){
        console.log(`${random1} ${random2}`);
        console.log(`${ratingArray[random1]} ${ratingArray[random2]}`);
        console.log(`${idArray[random1]} ${idArray[random2]}`);
        console.log("WORKS!");
      }
      else if(random1 === random2){
        console.log("ERROR!");
      }
      console.log("--------------");
    });
    */
   
    return (
        <div className="row">
            <div className="column" >
              {users.slice(random1,random1+1).map((user) => {                 
              return(
                <div key={user._id} className="rank-choice">                  
                  <h4>{user.name}:  {user.year} {user.make} {user.model}</h4>
                  <Image 
                    onClick={() => imageClick(ratingArray[random1],ratingArray[random2],1)}
                    className = "rank-images" 
                    cloudName = "tvek" 
                    publicId = {user.image}
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
                  <h4>{user.name}:  {user.year} {user.make} {user.model}</h4>
                  <Image 
                    onClick={() => imageClick(ratingArray[random2],ratingArray[random1],2)}
                    className = "rank-images" 
                    cloudName = "tvek" 
                    publicId = {user.image}
                  />
                  
                </div>
              )     
            })}
            </div>
        </div>
    );
                  /*
                  <img 
                    onClick={() => imageClick(ratingArray[random1],ratingArray[random2],1)}
                    className = "rank-images" 
                    src= {`/uploads/${user.image}`} 
                    alt=""
                  />
                  <img 
                    onClick={() => imageClick(ratingArray[random2],ratingArray[random1],2)}
                    className = "rank-images" 
                    src= {`/uploads/${user.image}`} 
                    alt=""
                  />*/
    
}


export default Rank;