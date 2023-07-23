const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
