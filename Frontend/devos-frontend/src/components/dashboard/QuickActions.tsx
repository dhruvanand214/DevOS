interface Props {
  onCreateTask: () => void;
  onNewNote: () => void;
}

export default function QuickActions({
  onCreateTask,
  onNewNote,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={onCreateTask}
        className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-left hover:bg-neutral-800 transition"
      >
        <div className="text-sm font-medium">
          Create Task
        </div>
        <div className="text-xs text-neutral-400 mt-1">
          Quickly add a new task
        </div>
      </button>

      <button
        onClick={onNewNote}
        className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-left hover:bg-neutral-800 transition"
      >
        <div className="text-sm font-medium">
          New Note
        </div>
        <div className="text-xs text-neutral-400 mt-1">
          Capture an idea in markdown
        </div>
      </button>
    </div>
  );
}
