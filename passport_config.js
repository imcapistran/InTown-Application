/* const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const localStrategy = require('passport-local').Strategy;


function initialize(passport, getUserByuser_name){
const authenticateUser = async (user_name, password, done) => {
    const user = getUserByuser_name(user_name)
    if (user == null) {
      return done(null, false, { message: 'No user with that user name' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
}

passport.use(new LocalStrategy({ usernameField: 'user_name' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser((email, done) => {
    return done(null, getUserByemail(email))
  })
}

module.exports = initialize */