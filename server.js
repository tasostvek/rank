const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3030;
const UserAccount = require("./models/userAccounts");
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(fileUpload());

app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rank', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB!' ))
.catch(err => console.log( err ));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(morgan('tiny'));


app.post('/api/upload', (req,res) => {
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


app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`));