const router = require("express").Router();
const ctrl = require("../controllers/note.controller");

router.get("/", ctrl.getNotes);
router.put("/:id", ctrl.updateNote);

module.exports = router;
