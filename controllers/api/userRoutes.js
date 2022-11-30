const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const newUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = newUserData.user_id;
        req.session.loggedIn = true;
          
        res.status(200).json(newUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//User login authentication
router.post('/login', async (req, res) => {

  try {
    const findUser = await User.findOne({ where: { email: req.body.email } });

    if (!findUser) {
      res
        .status(400).json({ message: 'Either the email or password is incorrect' });
      return;
    }

    const validPassword = await findUser.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(500).json({ message: 'Either the email or password is incorrect' });
      return;
    }

    req.session.save(() => {
      req.session.user_email = findUser.user_email;
      req.session.user_username = findUser.username;
      req.session.user_id = findUser.user_id;
      req.session.loggedIn = true;
      res.json({ user: findUser, message: 'You are now logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//User logout function
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;