const Router = require("express");
const tasksRouter = require("./tasksRouter");
const authRouter = require("./authRouter");

const router = new Router();

router.use("/tasks", tasksRouter);
router.use("/auth", authRouter);

module.exports = router;
