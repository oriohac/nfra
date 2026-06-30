const express = require("express");

const router = express.Router();

const User = require("../models/User");
const Match = require("../models/Match");
const Report = require("../models/Report");
const FitnessTestInterest = require("../models/FitnessTestInterest");

const adminOnly = require("../middleware/adminonly");

router.get(
    "/stats",
    adminOnly,
    async (req, res) => {

        try {

            const totalUsers = await User.countDocuments();

            const totalMatches = 0;
            // await Match.countDocuments();

            const totalReports = 0;
            // await Report.countDocuments();

            const maleUsers =
                await User.countDocuments({
                    gender: "Male"
                });

            const southernZoneGroupA = await User.countDocuments(
                {
                    zone: "Southern Zone Group A"
                }
            );
            const southernZoneGroupB = await User.countDocuments(
                {
                    zone: "Southern Zone Group B"
                }
            );
            const northernZoneGroupA = await User.countDocuments(
                {
                    zone: "Northern Zone Group A"
                }
            );
            const northernZoneGroupB = await User.countDocuments(
                {
                    zone: "Northern Zone Group B"
                }
            );

            const femaleSouthernZone =
                await User.countDocuments(
                    {
                        zone: "Female Southern Zone"
                    }
                );

            const femaleNorthernZone =
                await User.countDocuments(
                    {
                        zone: "Female Northern Zone"
                    }
                );



            const femaleUsers =
                await User.countDocuments({
                    gender: "Female"
                });

            const usersPerState =
                await User.aggregate([

                    {
                        $group: {
                            _id: "$state",
                            count: { $sum: 1 }
                        }
                    },

                    {
                        $sort: {
                            count: -1
                        }
                    }

                ]);

            const fitnessTestAttendees = await FitnessTestInterest.countDocuments();

            res.json({

                users: totalUsers,

                matches: totalMatches,

                reports: totalReports,

                maleUsers,

                femaleUsers,

                usersPerState,

                southernZoneGroupA,

                southernZoneGroupB,

                northernZoneGroupA,

                northernZoneGroupB,

                femaleSouthernZone,

                femaleNorthernZone,

                fitnessTestAttendees,


            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);





router.get("/users/all", adminOnly, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/users/male", adminOnly, async (req, res) => {
  try {
    const users = await User.find({ gender: "Male" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/users/female", adminOnly, async (req, res) => {
  try {
    const users = await User.find({ gender: "Female" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// // Get users with optional gender filter
// router.get("/users", adminOnly, async (req, res) => {
//   try {
//     let filter = {};
//     if (req.query.gender) {
//       filter.gender = req.query.gender; // expects "Male" or "Female"
//     }
//     const users = await User.find(filter);
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


router.get(
  "/users/:zone",
  adminOnly,

  async (req, res) => {

    try {

      const users = await User.find({

        zone: req.params.zone

        

      });
 console.log(req.params.zone);
      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

router.get(

  "/fitness-test-interest",

  adminOnly,

  async (req, res) => {

    try {

      const attendees =
        await FitnessTestInterest
          .find()
          .populate(

            "user",

            "firstName lastName state phone grade specialization zone gender"
          );

      res.json(attendees);

    } catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

  }
);


module.exports = router;