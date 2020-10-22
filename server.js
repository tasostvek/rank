const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3032;
const UserAccount = require("./models/userAccounts");
const { v4: uuidv4 } = require('uuid');
const {cloudinary} = require('./utils/cloudinary');
const { Server } = require('http');


const app = express();

app.use(fileUpload());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rank', {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB!' ))
.catch(err => console.log( err ));


app.use(express.json());
app.use(express.urlencoded({ extended: false}));


if(process.env.NODE.ENV === 'production'){
    app.use(express.static(path.join(__dirname,'./client/build')));
    app.get('*', function (req, res){
        res.sendFile(path.join(__dirname, './client/build','index.html'));
    });
}

app.use(cors());
app.use(morgan('tiny'));

app.post('/api/update', (req,res) => {

    console.log("Updated rating1 has been recieved!");

    UserAccount.findByIdAndUpdate(
        {_id:req.body._id}, 
        {$set:{rating:req.body.rating}}, 
        (err) => {
            if(err) {
                res.status(500).json({msg: 'Internal server errors with updating2'});
            }
            else{
                res.json({
                    msg:'Updated!'
                });
            }
    })
});


app.post('/api/upload', async (req,res) => {
    if(req,res ===null) {
        return res.status(400).json({msg:'No file uploaded'});
    }
    const file = req.files.file;

    let extension = ''
    //Check file extension of current image
    if(file.name.includes('.jpg')){
        extension = ".jpg"
    }
    if(file.name.includes('.jpeg')){
        extension = ".jpeg"
    }
    if(file.name.includes('.png')){
        extension = ".png"
    }

    
    const newFileID = uuidv4()
    const newFileName = newFileID + extension;
    try{
        const fileCloudinary = req.body.base64Image
        await cloudinary.uploader.upload(fileCloudinary, 
            { public_id: `${newFileID}` }
        );
    }
    catch(errorr){
        console.error(error);
    }
    /*
    //Store image in local filesystem
    file.mv(`${__dirname}/client/public/uploads/${newFileName}`, err => {
        if(err) {
            return res.status(500).json({msg: 'Error uploading image'});
        }
        res.json({fileName: newFileName, filePath: `../uploads/${newFileName}`});
    });
    */
    const newAccount = new UserAccount({
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        rating: 1400,
        image: newFileName
    });

    newAccount.save((error) => {
        if(error) {
            return res.status(500).json({msg: 'Internal server errors'});
        }
    })   
});

app.get('/api/users', (req,res)=>{
    UserAccount.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) =>{
            console.log('error: ',error);
        });
});

app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`));