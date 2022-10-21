const router = require('express').Router();
const { Blog, Comment } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const newUserData = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
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
