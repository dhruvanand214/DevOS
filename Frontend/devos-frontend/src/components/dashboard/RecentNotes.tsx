import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useAppContext } from "../../context/AppContext";
import type { Note } from "../../pages/Notes";

export default function RecentNotes({ notes }: { notes: Note[] }) {
  const navigate = useNavigate();
  const { openNote } = useAppContext();

  const recent = notes.slice(0, 5);

  if (recent.length === 0) {
    return (
      <section>
        <h3 className="text-sm font-semibold text-neutral-400 mb-3">
          Recent Notes
        </h3>
        <p className="text-sm text-neutral-500">
          No notes yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-400 mb-3">
        Recent Notes
      </h3>

      <ul className="space-y-1">
        {recent.map((note) => (
          <li
            key={note.id}
            onClick={() => {
              navigate(ROUTES.NOTES);
              openNote(note.id);
            }}
            className="cursor-pointer rounded px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            {note.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
