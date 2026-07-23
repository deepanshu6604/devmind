import {
  LayoutDashboard,
  FolderGit2,
  MessageSquare,
  BookOpen,
  FileText,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Projects", icon: FolderGit2, path: "/projects" },
  { name: "AI Chat", icon: MessageSquare, path: "/chat" },
  { name: "Onboarding", icon: BookOpen, path: "/onboarding" },
  { name: "Documentation", icon: FileText, path: "/documentation" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col">
      <div className="p-6 text-2xl font-bold">
        🧠 DevMind
      </div>

      <nav className="flex-1 px-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-[#1F2937]"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 text-sm text-gray-500">
        Version 0.5 Prototype
      </div>
    </aside>
  );
}