const router = require('express').Router();
const { Post } = require('../../models');
const checkAuth = require('../../utils/auth');

// CREATE new post
router.post('/', checkAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        id: req.body.id,
        title: req.body.title,
        contents: req.body.contents,
        user_id:req.session.userID,
      });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Edit post
  router.put('/:id', checkAuth, async (req, res) => {
    try {
      const [updatedPost] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (updatedPost > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete post
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [updatedPost] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (updatedPost > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
