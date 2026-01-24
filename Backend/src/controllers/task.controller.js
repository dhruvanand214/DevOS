const service = require("../services/task.service.js");

exports.getTasks = async (req, res) => {
  const tasks = await service.getTasks();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await service.createTask(req.body);
  res.status(201).json(task);
};
