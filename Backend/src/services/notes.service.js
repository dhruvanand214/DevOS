const Note = require("../models/note.model");

exports.getNotes = () => Note.find().sort({ updatedAt: -1 });
exports.updateNote = (id, data) =>
  Note.findByIdAndUpdate(id, data, { new: true });
