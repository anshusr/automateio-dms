const express = require('express');
const router = express.Router();
const { handleLoginSubmit } = require('../services/login');

router.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
  }
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { failures: req.session.loginFailures > 0 });
});

router.post('/login', (req, res) => {
  handleLoginSubmit(req).then(() => {
    if(req.session.user) {
      res.redirect('/');
    }
    res.redirect('/login');
  });
});

router.post('/register', (req, res) => {
  handleRegister(req).then(() => {
    if(req.session.user) {
      res.redirect('/')
    }
    res.redirect('/login');
  });
});

module.exports = router;
