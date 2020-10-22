import React, {useState} from 'react';
import axios from 'axios';


const SignUp = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [imageSource, setImageSource] = useState ();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onChange = e => {

        try{
            const fileSource = e.target.files[0];
            setFile(fileSource);
            setFileName(fileSource.name);
            fileImage(fileSource);
        }
        catch (error) {
            setFile(null);
            setFileName(null);
            setImageSource(null);
        };
    }
    
    const fileImage = (fileInput) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput);
        reader.onloadend = () => {
            setImageSource(reader.result);
            console.log("Image set")
        }
    }

    const uploadImage = (base64EncodedImage) => {
       console.log(base64EncodedImage) 
    }

    const onSubmit = async e => {
        e.preventDefault();

        if(!imageSource) {
            alert("Need to submit image")
            return;
        }
        uploadImage(imageSource);
        console.log("fileInput: " + file);
        console.log("fileName: " + fileName);

        const formData = new FormData();

        formData.append('file', file);
        formData.append('name', name);
        formData.append('email', email);
        
        try{
            axios.post('/api/upload',formData,{
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Image uploaded!")
            //document.getElementById("imageInput").value = "";
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