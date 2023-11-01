const {
  allCustomers,
  updateCustomers,
  deleteCustomers,
} = require("../controllers/customerController");
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

router.get("/", allCustomers);
router.put("/", upload.single("image"), updateCustomers);
router.delete("/", deleteCustomers);

module.exports = router;
