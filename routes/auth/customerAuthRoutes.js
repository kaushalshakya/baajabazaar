const {
  customerLogin,
  customerLogout,
  registerCustomer,
} = require("../../controllers/auth/customerAuthControllers");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/login", customerLogin);
router.post("/register", upload.single("image"), registerCustomer);
router.post("/logout", customerLogout);

module.exports = router;
