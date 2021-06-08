const exspress = require("express");

const multer = require("multer");
const path = require("path");

const router = exspress.Router();

const { uploadImgToStorage } = require("../middleware/file");

const storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    const name = path.parse(file.originalname).name;
    cb(null, `${name}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

router.post(
  "/images",
  upload.single("goods"),
  // minifyImage,
  async (req, res) => {
    console.log(req.file.path);
    const linkImg = await uploadImgToStorage(req.file.path);
    res.status(200).send({ link: linkImg });
  }
);
module.exports = router;
