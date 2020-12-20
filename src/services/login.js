const User = require('../dal/user')

async function handleLoginSubmit(req) {
  if (req.body.action === 'login') {
    const user = await User.get(req.body.username, req.body.password);
    req.session.user = user;
    if (!user) {
      req.session.loginFailures = 1 || req.session.loginFailures + 1;
      return;
    }
  } else {
    const user = await User.add(req.body.username, req.body.password);
    req.session.user = user;
  }

  req.session.loginFailures = 0;
}

module.exports = { handleLoginSubmit };