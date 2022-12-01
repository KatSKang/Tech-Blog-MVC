const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const posts = postData.get({ plain: true });

    res.render("dashboard", {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// router.get("/new", withAuth, (req, res) => {
//   res.render("newpost");
// });

// router.get("/edit/:id", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);

//     if (postData) {
//       const post = postData.get({ plain: true });

//       res.render("editpost", {
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect("login");
//   }
// });

module.exports = router;
