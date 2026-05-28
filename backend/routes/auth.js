const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const upload = require("../middleware/uploadprofileimage");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    
  

  const { firstName, lastName, email, refId, password } = req.body;

  if (
      !firstName ||
      !lastName ||
      !email ||
      !refId ||
      !password
    ) {
      return res.status(400).json({
        message: "Fill all fields"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    refId,
    password: hashedPassword
  }
);

  res.json(user);
} catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json("Invalid credentials");

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      refId: user.refId,
      role: user.role,
      onboardingCompleted: user.onboardingCompleted,
    }
  });
});

router.put("/onboarding/:id",
  upload.single('profilePhoto'),
  async (req, res) => {

    try {

      const updatedUser = await User.findByIdAndUpdate(req.params.id,

        {

          day: req.body.day,
          month: req.body.month,
          year: req.body.year,

          phone: req.body.phone,

          state: req.body.state,

          gender: req.body.gender,

          specialization: req.body.specialization,

          grade: req.body.grade,

          lastLeagueOfficiated: req.body.lastLeagueOfficiated,

          lastGradeYear: req.body.lastGradeYear,

          profilePhoto:
            req.file
              ? `/uploads/${req.file.filename}`
              : null,

          onboardingCompleted: true,


        },

        { new: true }

      );

      res.json(updatedUser);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  });

router.get("/user/:id", async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

const fs = require("fs");
const path = require("path");
router.patch("/user/:id",
  upload.single("profilePhoto"),
  async (req, res) => {

    try {

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const updatedData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        grade: req.body.grade,
        refId: req.body.refId,
      };

      // only update image if a new one exists
      if (req.file) {
        // delete old image if it exists
        if (user.profilePhoto) {

          const oldImagePath = path.join(
            __dirname,
            "..",
            user.profilePhoto
          );

          if(fs.existsSync(oldImagePath)){
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.log("Old image delete failed:", err);
            }
          });
        }
      }

        updatedData.profilePhoto =
          `/uploads/${req.file.filename}`;
      }

      const updatedUser = await User.findByIdAndUpdate(

        req.params.id,

       updatedData,

        { new: true }

      );

      res.json(updatedUser);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  });

router.post("/logout", async (req, res) => {
  try {
    // In JWT systems, logout is handled on the client
    // You can later add token blacklist here if needed

    return res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;