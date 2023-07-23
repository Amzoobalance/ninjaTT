const Router = require("express");
const router = new Router();
const tasksController = require("../controllers/tasksController");

router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.createTask);
router.put("/:id", tasksController.updateTask);

module.exports = router;
