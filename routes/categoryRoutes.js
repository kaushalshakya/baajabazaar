const router = require("express").Router();
const {
  allCategories,
  updateCategories,
} = require("../controllers/categoryControllers");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/category");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", allCategories);
router.patch("/:id", upload.single("image"), updateCategories);

module.exports = router;
