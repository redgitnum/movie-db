const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/Users')

function initialize () {
    const authorizeUser = (username, password, done) => {
        User.findOne({username: username})
        .then(async user => {
            if(user === null) {
                return done(null, false, {message: 'no user found'})
            }
            if(await bcrypt.compare(password, user.password)){
                return done(null, user, {message: 'login successful'})
            } else if (password === user.password){
                return done(null, user, {message: 'records updated successfully'})
            }   else return done(null, false, {message: 'wrong password'})
        })
        

    }

    passport.use(new LocalStrategy(authorizeUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}

module.exports = initialize