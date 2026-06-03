const multer = require("multer");

const cloudinary = require("../config/cloudinary");
const {CloudinaryStorage,} = require("multer-storage-cloudinary").CloudinaryStorage;

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "nfra/profile-images",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  },
});
// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + "-" + file.originalname
//     );
//   },

// });

const upload = multer({ storage });

module.exports = upload;