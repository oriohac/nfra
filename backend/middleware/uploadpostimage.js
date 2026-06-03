const multer = require("multer");

const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const path = require("path");

const storage =  CloudinaryStorage({
  cloudinary,

  params: {
    folder: "nfra/post-images",

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

//     cb(null, "uploads/posts");

//   },

//   filename: (req, file, cb) => {

//     cb(
//       null,

//       Date.now() +
//       path.extname(file.originalname)
//     );

//   }

// });

const upload = multer({ storage });

module.exports = upload;