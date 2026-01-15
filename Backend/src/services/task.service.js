const Task = require("../models/task.model");

exports.getTasks = () => Task.find().sort({ createdAt: -1 });
exports.createTask = (data) => Task.create(data);
