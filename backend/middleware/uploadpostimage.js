const multer = require("multer");

// const cloudinary = require("../config/cloudinary");

// const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const uploadToCloudinary = async (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: "nfra/profile-images",
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );

//     stream.end(fileBuffer);
//   });
// };

module.exports = upload;

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

// const upload = multer({ storage });

// module.exports = upload;