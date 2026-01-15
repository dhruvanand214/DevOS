import type { Task } from "../../pages/Tasks";

export default function FocusToday({ tasks }: { tasks: Task[] }) {
  const focusTasks = tasks
    .filter(
      (t) => t.status === "todo" || t.status === "in-progress"
    )
    .slice(0, 5);

  if (focusTasks.length === 0) {
    return (
      <section>
        <h3 className="text-sm font-semibold text-neutral-400 mb-3">
          Focus Today
        </h3>
        <p className="text-sm text-neutral-500">
          No pending tasks 🎉
        </p>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-400 mb-3">
        Focus Today
      </h3>

      <ul className="space-y-2">
        {focusTasks.map((task) => (
          <li
            key={task.id}
            className="rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
