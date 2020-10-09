import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
  const [file,setFile] = useState('');
  const [fileName, setFilename] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    
    try{
      await axios.post('http://localhost:3030/api/upload',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Image uploaded!")
      window.location.reload();
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
 

  /*<Route path="/" render={()=> <Home />} exact/>*/
  return(
    <div>
        <br/>
        <form className="contact-input" onSubmit={onSubmit}>

            <label className="contact-input-title username">Username</label>
            <input 
              name="name" 
              value={name}
              type="text" 
              placeholder="Enter username" 
              className="input-field"
              onChange={(e) => setName(e.target.value)}
            /> 
            <label className="contact-input-title email">Email</label>
            <input 
              name="email" 
              value={email}
              type="text" 
              placeholder="Enter email address" 
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="image-upload-line">
                <label className="contact-input-title image-label" htmlFor="imageInput">Upload Image</label>
                <input 
                name="image" 
                className="input-field image-upload" 
                accept="image/*" 
                id="imageInput" 
                type="file" 
                onChange={onChange}
                />
            </div>
            
            <br/>
            <button className="contact-btn">Sign Up</button>
        </form>
        <div className="userImages">
          <h2 className="title">Rank</h2>
          {users.map((user) => {                 
            return(
              <div key={user._id}> 
                <hr/>                   
                <h4 className = "userName">{users.indexOf(user)+1}) {user.name} {user.rating}</h4>
                <img src= {`/uploads/${user.image}`} alt=""/>
              </div>
            )     
          })}
        </div>
    </div>
  );
}

export default Home;