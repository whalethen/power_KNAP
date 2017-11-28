const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.redirect('/auth/google')
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('successful logout')
  res.clearCookie("user").redirect('/') 
});

router.get('/google', passport.authenticate('google', {
  scope:['profile'] // put other things in here you may want from google (check API)
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.cookie('user', req.user.displayName).redirect('/')
});

module.exports = router;