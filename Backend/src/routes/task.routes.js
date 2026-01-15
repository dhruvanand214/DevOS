const router = require("express").Router();
const ctrl = require("../controllers/task.controller");

router.get("/", ctrl.getTasks);
router.post("/", ctrl.createTask);

module.exports = router;
