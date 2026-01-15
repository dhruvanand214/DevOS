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
  return (
    <section>
      <header className="mb-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <p className="text-neutral-400 text-sm mt-1">
          Track and manage your work.
        </p>
      </header>

      <div className="space-y-2">
        {mockTasks.map((task) => (
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

