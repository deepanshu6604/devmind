import { useState } from "react";
import { addRepository } from "../../services/projectService";

interface Props {
  onAdded: () => void;
}

export default function AddRepositoryModal({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");

  async function handleSubmit() {
    if (!name || !path) {
      alert("Fill all required fields");
      return;
    }

    await addRepository({
      name,
      path,
      language,
      status: "Ready",
    });

    setName("");
    setPath("");
    setLanguage("");

    onAdded();
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Add Repository
      </h2>

      <div className="space-y-4">
        <input
          className="w-full rounded bg-[#1F2937] p-3"
          placeholder="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded bg-[#1F2937] p-3"
          placeholder="Repository Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />

        <input
          className="w-full rounded bg-[#1F2937] p-3"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-6 py-3 hover:bg-blue-700"
        >
          Save Repository
        </button>
      </div>
    </div>
  );
}