const router = require("express").Router();
const { register, login, logout, me, resetPassword } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register",       register);
router.post("/login",          login);
router.post("/logout",         protect, logout);
router.get ("/me",             protect, me);
router.post("/reset-password", resetPassword);

module.exports = router;
