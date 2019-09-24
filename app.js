const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


mongoose.connect('mongodb+srv://linus:nA7HxOKVadZBC9ST@cluster0-bi7s7.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;