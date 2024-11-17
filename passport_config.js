const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByName, getUserByEmail) {
  const authenticateUser = async (user_name, password, done) => {
    console.log('auth process started');
    const user = await getUserByName(user_name)
    if (user == null){
      console.log('user name not found');
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('pass checks out');
        return done(null, user)
      } else {
        console.log('incorect password');
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'user_name' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.email_add))
  passport.deserializeUser((email, done) => {
    return done(null, getUserByEmail(email))
  })
}

module.exports = initialize