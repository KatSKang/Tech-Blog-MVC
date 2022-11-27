const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts for homepage
router.get('/', async (req,res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain:true }));

    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single post
router.get('/post/:id', async (req,res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true});

      res.render('single-post', { post });
    } else {
      req.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});
  
  module.exports = router;