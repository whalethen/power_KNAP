const router = require('express').Router();
const passport = require('passport');
const cors = require('cors');

// auth login
router.get('/login', (req, res) => {
  res.redirect('/auth/google')
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  // console.log('LOGOUT ', req.session)
  req.session = null;
  req.logout();
  console.log('successful logout')
  // send them to homepage?
  // req.headers.cookie = ''
  res.clearCookie("user").redirect('/') 
});

router.get('/google', passport.authenticate('google', {
  scope:['profile'] // put other things in here you may want from google (check API)
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log(req.headers, '=========> REQUEST')
  // req.session = {id: req.user.id}
  res.cookie('user', req.user.displayName).redirect('/')
});

module.exports = router;