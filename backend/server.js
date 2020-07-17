const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const User = require('./models/Users')

require('dotenv').config()
const uri = process.env.MONGO_URI


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true},  () => console.log('MongoDb connected...'))

app.post('/user/login', (req, res) => {
    res.send('login info')
})

app.post('/user/register', (req, res) => {
    let {username, password} = req.body;
    User.findOne({username: username})
    .then(user => {
        if(!user){
            let newUserData = {username, password}
            let newUser = new User(newUserData);
            newUser.save()
        } else {
            console.log('username already exists')
        }
    })
    res.send('register info')
})

app.listen(5000, () => console.log('app running on port 5000...'))