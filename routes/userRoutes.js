const express = require("express");
const router = express.Router();

const {
  userRegistration,
  userLogin,
  userInfo,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/info", validateToken, userInfo);

module.exports = router;
