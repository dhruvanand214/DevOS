import CreateTaskRow from "../components/CreateTaskRow";
import TaskItem from "../components/TaskItem";
import { useAppContext } from "../context/AppContext";
import { useKeyboard } from "../hooks/useKeyboard";
import { useEffect, useState } from "react";
import { createTask, fetchTasks } from "../utils/api";

type TaskStatus = "todo" | "in-progress" | "done";
type TaskPriority = 1 | 2 | 3;

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

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

export default function Tasks() {
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const { isCreatingTask, cancelCreateTask } = useAppContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  async function handleCreateTask(title: string) {
    const newTask = await createTask(title);
    setTasks((prev) => [...prev, newTask]);

    cancelCreateTask();
  }


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
      ? tasks
      : tasks.filter((task) => task.status === filter);

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
        {isCreatingTask && <CreateTaskRow onCreate={handleCreateTask} onCancel={cancelCreateTask} />}

        {
          filteredTasks.length === 0 && (
            <p className="text-sm text-neutral-500 mt-4">
              No tasks for this filter.
            </p>
          )
        }
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        }

      </div>
    </section>
  );
}

