const express = require('express');
const router = express.Router();
const User = require('../dal/user');
const { handleError } = require('../utils');

router.get('/', handleError(getLoginPage, false));
router.post('/', handleError(handleLoginPost, false));

function getLoginPage(req, res) {
  res.render('login', { failures: req.session.loginFailures > 0 });
}

async function handleLoginPost(req, res) {
  if (req.body.action === 'login') {
    const user = await User.get(req.body.username, req.body.password);
    req.session.user = user;
    if (!user) {
      req.session.loginFailures = 1 || req.session.loginFailures + 1;
      return res.redirect('/login');
    }
  } else {
    const user = await User.add(req.body.username, req.body.password);
    req.session.user = user;
  }

  req.session.loginFailures = 0;
  if (req.session.user) {
    return res.redirect('/')
  }
  res.redirect('/login');
}

module.exports = router;