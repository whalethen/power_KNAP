const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id); 
  // gives the browser the users google profile id to store in cookie
});

// passport.deserializeUser((id, done) => {
//   // browser sends back id, we try to identify the user with it
//     // need to store users in db to use this 
//   done(null, user); 
// });

passport.use(
  new GoogleStrategy({
    // options for google strat
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
  }, (accessToken, refreshToken, profile, done) => {
    // done(null)
    done(null, profile);
  })
)

// passport.use(
//   new GoogleStrategy({
//     // options for google strat
//     callbackURL: '/auth/google/redirect',
//     clientID: process.env.GOOGLECLIENTID,
//     clientSecret: process.env.GOOGLECLIENTSECRET,
//   }, (accessToken, refreshToken, profile, done) => {
//     // check if user already exists in our db
//     // User.findOne({googleId: profile.id}).then(currentUser => {
//     //   if (currentUser) {
//     //     // user already exists
//     //     console.log('user is: ', currentUser);
//     //     done(null, currentUser);
//     //   } else {
//     //     // user doesn't exist (create new)
//     //     new User({
//     //       googleId: profile.id,
//     //       username: profile.displayName
//     //     }).save().then((newUser) => {
//     //       console.log('new user created: ' + newUser);
//     //       done(null, newUser);
//     //     })
//     //   }
//     // })
//   })
// )