import { useKeyboard } from "../hooks/useKeyboard";

type TaskStatus = "todo" | "in-progress" | "done";
type TaskPriority = 1 | 2 | 3;

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design DevOS app shell",
    status: "done",
    priority: 2,
  },
  {
    id: "2",
    title: "Implement Tasks UI",
    status: "in-progress",
    priority: 1,
  },
  {
    id: "3",
    title: "Add keyboard navigation",
    status: "todo",
    priority: 3,
  },
];

import { useState } from "react";

function getStatusLabel(status: TaskStatus) {
  switch (status) {
    case "todo":
      return "Todo";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
  }
}

function getPriorityColor(priority: TaskPriority) {
  switch (priority) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-yellow-400";
    case 3:
      return "text-green-400";
  }
}

export default function Tasks() {
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  useKeyboard((e) => {
  if (e.target instanceof HTMLInputElement) return;

  switch (e.key) {
    case "1":
      setFilter("all");
      break;
    case "2":
      setFilter("todo");
      break;
    case "3":
      setFilter("in-progress");
      break;
    case "4":
      setFilter("done");
      break;
  }
});


  const filteredTasks =
    filter === "all"
      ? mockTasks
      : mockTasks.filter((task) => task.status === filter);


  return (
    <section>
      <div className="flex gap-2 mb-6">
        {["all", "todo", "in-progress", "done"].map((status, index) => (
          <button
            key={status}
            onClick={() => setFilter(status as TaskStatus | "all")}
            className={`px-3 py-1 rounded text-sm border transition ${filter === status
              ? "bg-neutral-800 border-neutral-700 text-white"
              : "border-neutral-800 text-neutral-400 hover:text-white"
              }`}
          >
            {status === "all"
              ? "All (1)"
              : `${getStatusLabel(status as TaskStatus)} (${index + 1})`}
          </button>
        ))}
      </div>

      <header className="mb-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <p className="text-neutral-400 text-sm mt-1">
          Track and manage your work.
        </p>
      </header>

      <div className="space-y-2">
        {
          filteredTasks.length === 0 && (
            <p className="text-sm text-neutral-500 mt-4">
              No tasks for this filter.
            </p>
          )
        }
        {filteredTasks.length > 0 &&
        filteredTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded border border-neutral-800 bg-neutral-900 px-4 py-3"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {task.title}
            </span>
            <span className="text-xs text-neutral-400">
              {getStatusLabel(task.status)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className={getPriorityColor(task.priority)}>
              P{task.priority}
            </span>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
}

