const Note = require("../models/notes.model.js");

exports.getNotesService = () => Note.find().sort({ updatedAt: -1 });
exports.updateNoteService = (id, data) =>
  Note.findByIdAndUpdate(id, data, { new: true });
