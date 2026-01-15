import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useKeyboard } from "../hooks/useKeyboard";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function Notes() {

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "DevOS Vision",
      content: `# DevOS

A keyboard-first developer productivity system.
`,
      updatedAt: "2026-01-15",
    },
    {
      id: "2",
      title: "Command Palette Ideas",
      content: `## Commands
- Create task
- Open note
`,
      updatedAt: "2026-01-14",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);


  const { selectedNoteId, openNote } = useAppContext();
  const activeNoteId = selectedNoteId ?? notes[0].id;

  const selectedNote = notes.find(
    (note) => note.id === activeNoteId
  );

  useKeyboard((e) => {
    if (isEditing) return;

    const currentIndex = notes.findIndex(
      (n) => n.id === activeNoteId
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = notes[currentIndex + 1];
      if (next) openNote(next.id);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = notes[currentIndex - 1];
      if (prev) openNote(prev.id);
    }

    if (e.key === "Enter") {
      setIsEditing(true);
    }
  });

  useKeyboard((e) => {
    if (!isEditing) return;

    if (e.key === "Escape") {
      setIsEditing(false);
    }
  });



  return (
    <section className="flex h-full gap-6">
      {/* Notes List */}
      <aside className="w-64 border-r border-neutral-800 pr-4">
        <h2 className="text-sm font-semibold mb-4 text-neutral-400">
          Notes
        </h2>

        <ul className="space-y-1">
          {notes.map((note) => (
            <li
              key={note.id}
              onClick={() => openNote(note.id)}
              className={`cursor-pointer rounded px-3 py-2 text-sm ${selectedNoteId === note.id
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
            >
              <div className="font-medium">{note.title}</div>
              <div className="text-xs text-neutral-500">
                {note.updatedAt}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Editor */}
      <div
  className={`flex-1 flex flex-col ${
    isEditing ? "ring-1 ring-neutral-700 rounded p-2" : ""
  }`}
>

        {selectedNote ? (
          <>
            <input
              className="mb-4 bg-transparent text-xl font-semibold outline-none border-b border-neutral-800 pb-2"
              value={selectedNote.title}
              readOnly={!isEditing}
              onChange={(e) =>
                setNotes((prev) =>
                  prev.map((n) =>
                    n.id === selectedNote.id
                      ? { ...n, title: e.target.value }
                      : n
                  )
                )
              }
            />


            <textarea
              className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
              value={selectedNote.content}
              readOnly={!isEditing}
              onChange={(e) =>
                setNotes((prev) =>
                  prev.map((n) =>
                    n.id === selectedNote.id
                      ? { ...n, content: e.target.value }
                      : n
                  )
                )
              }
            />

          </>
        ) : (
          <p className="text-neutral-500">No note selected.</p>
        )}
      </div>
    </section>
  );
}

