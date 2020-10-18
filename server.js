const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3032;
const UserAccount = require("./models/userAccounts");
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(fileUpload());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rank', {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB!' ))
.catch(err => console.log( err ));

/*mongoose.connection.on('connected', () => {
    console.log("Connected to Mongoose!");
});*/


app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(express.static('./client/build')); 

app.use(cors());
app.use(morgan('tiny'));

app.post('/Rate/api/update1', (req,res) => {

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
                    msg:'Updated2!'
                });
            }
    })
});

app.post('/Rate/api/update2', (req,res) => {

    console.log("Updated rating2 has been recieved!");

    UserAccount.findByIdAndUpdate(
        {_id:req.body._id}, 
        {$set:{rating:req.body.rating}}, 
        (err) => {
            if(err) {
                res.status(500).json({msg: 'Internal server errors with updating2'});
            }
            else{
                res.json({
                    msg:'Updated2!'
                });
            }
    })
});

app.post('/SignUp/api/upload', (req,res) => {
    if(req,res ===null) {
        return res.status(400).json({msg:'No file uploaded'});
    }

    const file = req.files.file;

    //Name of stored image
    const newFileName = uuidv4() + "-" + file.name;

    file.mv(`${__dirname}/client/public/uploads/${newFileName}`, err => {
        if(err) {
            return res.status(500).json({msg: 'Error uploading image'});
        }
        res.json({fileName: newFileName, filePath: `../uploads/${newFileName}`});
    });

    const newAccount = new UserAccount({
        name: req.body.name,
        email: req.body.email,
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

app.get('/Rate/api/users', (req,res)=>{
    UserAccount.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) =>{
            console.log('error: ',error);
        });
});


app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`));