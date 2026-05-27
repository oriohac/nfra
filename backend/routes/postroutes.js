const express = require("express");

const router = express.Router();

const Post = require("../models/Post");

const adminOnly = require("../middleware/adminonly");

const upload = require("../middleware/uploadpostimage");

router.post(
  "/",
  adminOnly,
  upload.single("image"),
  async (req, res) => {

    try {
        console.log(req.file);
        console.log(req.body);

      const post = await Post.create({

          title: req.body.title,

          content: req.body.content,

          image: `/uploads/posts/${req.file.filename}`

        });

      res.json(post);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);
router.get(
  "/latest",
  async (req, res) => {

    const posts = await Post.find().sort({ createdAt: -1 }).limit(4);

    res.json(posts);

  }
);

router.get("/", async (req, res) => {

  const posts = await Post.find()
    .sort({ createdAt: -1 });

  res.json(posts);

});

router.get("/:id", async (req, res) => {

  try {

    const post =
      await Post.findById(
        req.params.id
      );

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.patch(
  "/:id",
  adminOnly,
  upload.single("image"),
  async (req, res) => {

    try {

      const updateData = {

        title: req.body.title,

        content: req.body.content

      };

      if (req.file) {

        updateData.image =
          `/uploads/posts/${req.file.filename}`;

      }

      const updatedPost =
        await Post.findByIdAndUpdate(

          req.params.id,

          updateData,

          { new: true }

        );

      res.json(updatedPost);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

router.delete(
  "/:id",
  adminOnly,
  async (req, res) => {

    try {

      await Post.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Post deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

router.get("/", async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit = 6;

    const skip =
      (page - 1) * limit;

    const totalPosts =
      await Post.countDocuments();

    const posts =
      await Post.find()

      .sort({ createdAt: -1 })

      .skip(skip)

      .limit(limit);

    res.json({

      posts,

      totalPages:
        Math.ceil(
          totalPosts / limit
        )

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;