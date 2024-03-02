const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());

app.use('/api', postRoutes);


app.use('/auth', authRoutes);

///my DB mongo on docker 
mongoose.connect('mongodb://127.0.0.1:27017/db')
    .then(() => {

        console.log("connected to db");
        app.listen(3001, () => {
            console.log('server-work on port 3001');
        });
    })
    .catch(() => {

        console.log("connection failed");
    })
