import React, {useState} from 'react';
import axios from 'axios';


const SignUp = () => {
    const [file,setFile] = useState('');
    const [fileName, setFilename] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

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
            await axios.post('/SignUp/api/upload',formData,{
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Image uploaded!")
            document.getElementById("imageInput").value = "";
            //window.location.reload();
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

    return (
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
                    <label className="contact-input-title" id="image-label" htmlFor="imageInput">Your Car</label>
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
        </div>
    );
}

export default SignUp;