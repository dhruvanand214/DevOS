import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useKeyboard } from "../hooks/useKeyboard";
import { ROUTES } from "../utils/routes";
import type { Command } from "../utils/commands";
import CommandPalette from "../components/CommandPalette";
import Sidebar from "../components/Sidebar";
import { notes } from "../data/notes";
import { useAppContext } from "../context/AppContext";

export default function AppLayout() {

  const navigate = useNavigate();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { openNote, startCreateTask } = useAppContext();

  const staticCommands: Command[] = [
    {
      id: "go-tasks",
      label: "Go to Tasks",
      action: () => navigate(ROUTES.TASKS),
      group: "Navigation",
    },
    {
      id: "go-notes",
      label: "Go to Notes",
      action: () => navigate(ROUTES.NOTES),
      group: "Navigation",
    },
    {
      id: "create-task",
      label: "Create Task",
      action: () => {
        navigate(ROUTES.TASKS);
        startCreateTask();
      },
      group: "Actions",
    },
  ];

  const noteCommands: Command[] = notes.map((note) => ({
    id: `open-note-${note.id}`,
    label: `Open Note: ${note.title}`,
    action: () => {
      navigate(ROUTES.NOTES);
      console.log(`Open note ${note.title}`);
    },
    group: "Notes",
  }));

  const commands: Command[] = [
    ...staticCommands,
    ...noteCommands,
  ];

  useKeyboard((e) => {
    const target = e.target as HTMLElement;

    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsPaletteOpen(true);
      return;
    }

    switch (e.key) {
      case "t":
        navigate(ROUTES.TASKS);
        break;
      case "n":
        navigate(ROUTES.NOTES);
        break;
    }
  });


  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
      <CommandPalette
        isOpen={isPaletteOpen}
        commands={commands}
        onClose={() => setIsPaletteOpen(false)}
      />

    </div>
  );
}
