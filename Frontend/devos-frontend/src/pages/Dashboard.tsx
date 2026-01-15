/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useAppContext } from "../context/AppContext";
import FocusToday from "../components/dashboard/FocusToday";
import QuickActions from "../components/dashboard/QuickActions";
import RecentNotes from "../components/dashboard/RecentNotes";
import { useEffect, useState } from "react";
import { fetchTasks, fetchNotes } from "../utils/api";
import type { Task } from "./Tasks";
import type { Note } from "./Notes";

export default function Dashboard() {
  const navigate = useNavigate();
  const { startCreateTask } = useAppContext();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);


  useEffect(() => {
    fetchTasks().then(setTasks);
    fetchNotes().then(setNotes);
  }, []);


  return (
    <section className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <header>
        <h2 className="text-2xl font-semibold">
          Welcome back 👋
        </h2>
        <p className="text-neutral-400 mt-1">
          What would you like to work on?
        </p>
      </header>

      {/* Quick Actions */}
      <QuickActions
        onCreateTask={() => {
          navigate(ROUTES.TASKS);
          startCreateTask();
        }}
        onNewNote={() => navigate(ROUTES.NOTES)}
      />

      {/* Focus Today */}
      <FocusToday tasks={tasks} />

      {/* Recent Notes */}
      <RecentNotes notes={notes} />

      {/* Footer Hint */}
      <p className="text-sm text-neutral-500">
        Tip: Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open commands
      </p>
    </section>
  );
}
