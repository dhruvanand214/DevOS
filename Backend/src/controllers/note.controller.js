const service = require("../services/note.service");

exports.getNotes = async (req, res) => {
  const notes = await service.getNotes();
  res.json(notes);
};

exports.updateNote = async (req, res) => {
  const note = await service.updateNote(req.params.id, req.body);
  res.json(note);
};
