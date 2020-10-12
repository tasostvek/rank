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

    /*function insertionSort (arrayList){
        let arrayLength = arrayList.length;

        for(let i = 0; i<arrayLength; i++ ){

        }
    }
    */

    //console.log(array);
    //console.log(insertionSort(array))

    return (
        <div className="row">
            <div className="column" >
                <h1>Column 1</h1>
                <p>Some text..</p>
            </div>
            <div className="column rank-OR" >
                <h2>OR</h2>
            </div>
            <div className="column">
                <h1>Column 2</h1>
                <p>Some text..</p>
            </div>
        </div>
    );
}

export default Rank;