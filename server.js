const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

//Http request logger
app.use(morgan('tiny'));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));