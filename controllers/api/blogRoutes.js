const router = require('express').Router();
const { Blog, Comment } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const newBlog = await Blog.create({
        id: req.body.id,
        title: req.body.title,
        contents: req.body.contents,
        user_id:req.findby
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
