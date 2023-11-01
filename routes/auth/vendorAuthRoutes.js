const {
  vendorLogin,
  vendorLogout,
  registerVendor,
} = require("../../controllers/auth/vendorAuthController");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/vendors");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/login", vendorLogin);
router.post("/register", upload.single("image"), registerVendor);
router.post("/logout", vendorLogout);

module.exports = router;
