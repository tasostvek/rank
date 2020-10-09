import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';

const Rank = () => {
    const [users, setUsers] = useState([]);
    const array = [ 5, 3, 10, 1, 26, 4];
    // 5 

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

    /*function insertionSort (arrayList){
        let arrayLength = arrayList.length;

        for(let i = 0; i<arrayLength; i++ ){

        }
    }*/
    
    console.log(array);
    //insertionSort(array)

    return (
        <div className="row">
            <div className="column" >
                <h2>Column 1</h2>
                <p>Some text..</p>
            </div>
            <div className="column">
                <h2>Column 2</h2>
                <p>Some text..</p>
            </div>
        </div>
    );
}

export default Rank;