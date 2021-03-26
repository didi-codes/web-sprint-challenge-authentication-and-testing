const bcryptjs = require('bcryptjs');
const router = require('express').Router();

const Auth = require('./auth-model');
const { checkUsernameExists } = require('../middleware/middleware');
const { buildToken } = require('./auth-token');

router.post('/register', checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcryptjs.hashSync(password, 10);
  const userForDatabase = { username, password: hash };
  Auth.add(userForDatabase)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.post('/login', checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;
  Auth.findBy({ username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = buildToken(user);
        res.status(200).json({
          message: `Welcome ${username}`,
          token,
        });
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
        });
      }
    })
    .catch(next);
});

module.exports = router;
