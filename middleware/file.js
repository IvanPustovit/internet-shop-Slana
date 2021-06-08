// const imagemin = require("imagemin");
// const imageminJpegtran = require("imagemin-jpegtran");
// const imageminPngquant = require("imagemin-pngquant");
// const imageminWebp = require("imagemin-webp");
// const webp = require("webp-converter");
const path = require("path");
const { promises: fsPromises } = require("fs");
const { Storage } = require("@google-cloud/storage");

const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDmRwCWtQpK4BE2P2OH2oin_lKLgC6AVRk",
  authDomain: "slana-88585.firebaseapp.com",
  databaseURL: "https://slana-88585.firebaseio.com",
  projectId: "slana-88585",
  storageBucket: "slana-88585.appspot.com",
  storBucket: "slana-2020.appspot.com",
  messagingSenderId: "529564567921",
  appId: "1:529564567921:web:868e97c1593862379f0ed0",
  measurementId: "G-F7699MYYR9",
};
firebase.initializeApp(firebaseConfig);

const storage = new Storage({
  keyFilename: "slana-2020-5e3c5cc61de0.json",
  // apiKey: process.env.GLOUD_API,
});

const storageTwo = new Storage({
  keyFilename: "slana-88585-e4b6970d7358.json",
  // apiKey: process.env.GLOUD_API,
});

const uploadImgToStorage = async (files) => {
  try {
    const fileInfo = await storage
      .bucket(`${firebaseConfig.storBucket}`)
      .upload(`${files}`, {
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
        public: true,
      });
    // const fileInfoTwoBase = await storageTwo
    //   .bucket(`${firebaseConfig.storageBucket}`)
    //   .upload(`${files}`, {
    //     gzip: true,
    //     metadata: {
    //       cacheControl: "public, max-age=31536000",
    //     },
    //     public: true,
    //   });
    const link = fileInfo[0].metadata;
    // const linkSecond = fileInfoTwoBase[0].metadata;

    await fsPromises.unlink(files);
    return { link };
  } catch (error) {
    console.log("error", error);
  }
};

// const minifyImage = async (req, res, next) => {
//   try {
//     console.log(req.file);
//     const MINIFILED_DIR = "images";
// await webp.cwebp(
//   `draft/${req.file.filename}`,
//   `${MINIFILED_DIR}/${path.parse(req.file.filename).name}.webp`,
//   "-q 50"
// );
// await imagemin([`draft/${req.file.filename}`], {
//   plugins: [imageminWebp({ quality: 50 })],
//   destination: MINIFILED_DIR,
// plugins: [
//   imageminJpegtran({ progressive: true, arithmetic: true }),
//   imageminPngquant({
//     quality: [0.6, 0.8],
//   }),
// ],
// });
// const { filename, path: draftPath } = req.file;

//     await fsPromises.unlink(draftPath);

//     req.file = {
//       ...req.file,
//       path: path.join(
//         MINIFILED_DIR,
//         `${path.parse(req.file.filename).name}.webp`
//       ),
//       destination: MINIFILED_DIR,
//     };
//     console.log(req.file);
//     next();
//   } catch (error) {
//     console.log("ERROR", error);
//     next(error);
//   }
// };

module.exports = { uploadImgToStorage };
