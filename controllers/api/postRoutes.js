const router = require('express').Router();
const { Post } = require('../../models');
const checkAuth = require('../../utils/auth');

// CREATE new post
router.post('/newpost', checkAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id:req.session.userID,
      });
      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Edit post
  router.put('/:id', checkAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!updatedPost) {
        res.status(404).json({message: 'No posts with this id '});
        return;
      }

      res.status(200).end();

    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete post
  router.delete('/:id', checkAuth, async (req, res) => {
    try {
      const destPost = Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!destPost) {
        res.status(404).json({message: 'No posts with this id '});
        return;
      }
      res.status(200).json(destPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
