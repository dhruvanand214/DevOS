import { getNotesService, updateNoteService } from "../services/notes.service.js";

export async function getNotes(req, res) {
  const notes = await getNotesService();
  res.json(notes);
}

export async function updateNote(req, res) {
  const note = await updateNoteService(req.params.id, req.body);
  res.json(note);
}
