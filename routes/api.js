const express = require('express');

const router = express.Router();

const EmailEntry = require('../models/userAccounts');

router.post('/save', (req,res) => {
    console.log('Email: ', req.body);
    const data = req.body;

    const newEmail = new EmailEntry(data);

    newEmail.save((error) => {
        if(error) {
            res.status(500).json({msg: 'Internal server errors'});
        }
        else{
            res.json({
                msg:'We received your data!'
            });
        }
    })
});

module.exports = router;