const express = require("express");

const router = express.Router();

const User = require("../models/User");
const Match = require("../models/Match");
const Report = require("../models/Report");

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

            res.json({

                users: totalUsers,

                matches: totalMatches,

                reports: totalReports,

                maleUsers,

                femaleUsers,

                usersPerState

            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);

module.exports = router;