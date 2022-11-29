const router = require('express').Router();
const { Post } = require('../models/');
const checkAuth = require('../utils/auth');

router.get('/', checkAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', checkAuth, (req, res) => {
  res.render('newpost');
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editpost', {
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;