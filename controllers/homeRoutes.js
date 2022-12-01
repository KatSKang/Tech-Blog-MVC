const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// Get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          Model: User,
          attributes: ["username"],
        },
      ],
    });

    res.render("homepage", { postData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [
        {
          model: Comment,
          attributes: ["content"],
        },
        {
          model: User,
          attribute: ["username"],
        },
      ],
    });

    const commentData = await Comment.findAll({
      raw: true,
      nest: true,
      where: { post_id: post.id },
      include: [
        {
          model: User,
          attribute: ["username"],
        },
      ],
    });

    res.render("singlepost", { postData, commentData, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

// Signup route
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
