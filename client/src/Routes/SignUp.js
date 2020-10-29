import React, {useState} from 'react';
import Message from './Message';
import axios from 'axios';


const SignUp = () => {
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');
    const [imageSource, setImageSource] = useState ();
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    const onChange = e => {
        try{
            const fileSource = e.target.files[0];
            setFile(fileSource);
            fileImage(fileSource);
        }
        catch (error) {
            setFile(null);
            setImageSource(null);
        };
    }
    
    const fileImage = (fileInput) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput);
        reader.onloadend = () => {
            setImageSource(reader.result);
        }
    }

    const resetInputs = () => {
        setFile(null);
        setImageSource(null);
        setName('')
        setModel('')
        setMake('')
        setYear('')
        document.getElementById("imageInput").value = "";
    }

    const onSubmit = e => {
        e.preventDefault();

        if(file.size>500000){
            setMessage("Car image too large")
            return;
        }

        if(!imageSource) {
            setMessage("Need an image")
            return;
        }
        if(!name) {
            setMessage("Need a username")
            return;
        }
        if(!model) {
            setMessage("Need car model")
            return;
        }
        if(!make) {
            setMessage("Need car make")
            return;
        }
        if(!year) {
            setMessage("Need car year")
            return;
        }

        let base64Image = JSON.stringify(imageSource);

        const formData = new FormData();

        formData.append('base64Image', imageSource);
        formData.append('file', file);
        formData.append('name', name);
        formData.append('make', make);
        formData.append('model', model);
        formData.append('year', year);


        try{
            console.log(`Username: ${name}`);
            console.log(`Make: ${make}`);
            console.log(`Model: ${model}`);
            console.log(`Year: ${year}`);
            console.log(`Photo: ${imageSource}`);
            console.log("Waiting for upload....")
            axios.post('/SignUp',formData,{
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });

            setMessage("Your car is signed up!")
            resetInputs();
            //window.reload();
        }
        catch(err){
            if(err){
                setMessage('There was a problem with the server');
            }
            else{
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <div>
            <form className="contact-input" onSubmit={onSubmit}>
                {message ? <Message msg={message}/> : <div className="sign-up-title">Sign Up</div>}
                <label className="contact-input-title username">Username</label>
                <input 
                    maxLength="15"
                    name="name" 
                    value={name}
                    type="text" 
                    placeholder="Enter username" 
                    className="input-field"
                    onChange={(e) => setName(e.target.value)}
                /> 
                <label className="contact-input-title email">Make</label>
                <input 
                    name="make" 
                    value={make}
                    type="text" 
                    placeholder="Enter car make" 
                    className="input-field"
                    onChange={(e) => setMake(e.target.value)}
                />
                <label className="contact-input-title email">Model</label>
                <input 
                    name="model" 
                    value={model}
                    type="text" 
                    placeholder="Enter car model" 
                    className="input-field"
                    onChange={(e) => setModel(e.target.value)}
                />
                <label className="contact-input-title email">Year</label>
                <input 
                    name="year" 
                    value={year}
                    type="text" 
                    placeholder="Enter car year" 
                    className="input-field"
                    onChange={(e) => setYear(e.target.value)}
                />
                <div className="image-upload-line">
                    <label className="contact-input-title" id="image-label" htmlFor="imageInput">Pick Car Image</label>
                    <input 
                        name="image" 
                        className="input-field image-upload" 
                        accept="image/*" 
                        id="imageInput" 
                        type="file" 
                        placeholder="Choose car image" 
                        onChange={onChange}
                    />
                </div>
                <div className="button-input">
                    <button className="contact-btn">Sign Up</button>
                    <img src={imageSource} className = "image-preview" alt=""/>
                </div>
                <br/>
            </form>
        </div>
    );
}

export default SignUp;