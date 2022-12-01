const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    const userPosts = await Post.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [
        {
          model: Comment,
          attributes: ["comments"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const allComment = await Comment.findAll({
      raw: true,
      nest: true,
      where: { post_id: userPosts.id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // res.status(200).json(blogIdData);
    // console.log("** allComment",allComment)
    res.render("singlepost", {
      userPosts,
      allComment,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
