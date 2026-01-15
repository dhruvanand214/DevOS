import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/routes";

const navItems = [
  { label: "Dashboard", path: ROUTES.DASHBOARD },
  { label: "Tasks", path: ROUTES.TASKS },
  { label: "Notes", path: ROUTES.NOTES },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
      <h1 className="text-lg font-semibold mb-6">DevOS</h1>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm ${
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
