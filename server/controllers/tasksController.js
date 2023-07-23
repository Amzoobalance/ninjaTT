const { Tasks } = require("../db/models/models");
const ApiError = require("../error/apiError");
const { isEmail } = require("is-validate");

class TasksController {
  async createTask(req, res) {
    const { userName, userEmail, body } = req.body;
    if (!userName || !userEmail || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (
      typeof userName !== "string" ||
      !isEmail(userEmail) ||
      typeof body !== "string"
    ) {
      return res.status(400).json({ error: "Invalid task fields" });
    }

    const task = await Tasks.create({
      userName,
      userEmail,
      body,
    });
    res.json(task);
  }

  async getAllTasks(req, res) {
    const limit = 3;
    let { sort, page, direction } = req.query;
    sort = sort || "id";
    direction = direction || "asc";
    page = page || 1;
    let offset = page * limit - limit;

    const tasks = await Tasks.findAndCountAll({
      limit,
      offset,
      order: [[sort, direction]],
    });
    return res.json(tasks);
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const { body, completed, reworkedByAdmin } = req.body;
    const tasks = await Tasks.update(
      { body, completed, reworkedByAdmin },
      { where: { id } }
    );
    return res.json(tasks);
  }
  catch(error) {
    ApiError.notFound(error.message);
  }
}

module.exports = new TasksController();
