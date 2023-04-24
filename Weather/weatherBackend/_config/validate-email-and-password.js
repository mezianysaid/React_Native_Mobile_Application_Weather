const isEmail = require('is-email');

function validateEmailAndPassword(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ error: { code: 'no-email' } });
    return;
  }

  if (!isEmail(email)) {
    res
      .status(400)
      .send({ error: { code: 'invalid-email' } });
    return;
  }

  if (!password) {
    res
      .status(400)
      .send({ error: { code: 'no-password' } });
    return;
  }

  next();
}

module.exports = validateEmailAndPassword;