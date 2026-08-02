import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <button
        onClick={() => navigate("/projects")}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
      >
        Upload Repository
      </button>
    </header>
  );
}