const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/Users')
const flash = require('express-flash')

const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const updateRecords = require('./functions/index')



require('dotenv').config()
const uri = process.env.MONGO_URI


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session())

const initializePassport = require('./passport-config');
initializePassport()

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true},  () => console.log('MongoDb connected...'))

app.post('/user/login', passport.authenticate('local', {
    successFlash: true,
    failureFlash: true
}), (req, res) => res.send(req.user)  
)

app.post('/user/register', (req, res) => {
    let {username, password} = req.body;
    User.findOne({username: username})
    .then(user => {
        if(!user){
            let newUserData = {username, password}
            let newUser = new User(newUserData);
            newUser.save()
            return res.send({message: 'register successful', success: true})
        } else {
            return res.send({message: 'username already exists', success: false})
        }
    })
})

app.post('/user/logout', (req, res) => {
    req.logOut()
    res.send('logged out')
})

app.post('/user/update', (req, res) => {
    User.findOne({username: req.body.username})
    .then(async user => {
        if(await bcrypt.compare(req.body.password, user.password)){
            user.password = await bcrypt.hash(req.body.new_password, 10)
            await user.save()
            return res.send('update complete')
        }
        return res.send('update failed')
    }).catch(e => console.log(e))
})

app.post('/user/update/records', async (req, res) => res.send( await updateRecords(req)))


app.listen(5000, () => console.log('app running on port 5000...'))