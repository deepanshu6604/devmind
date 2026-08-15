import { useState } from "react";
import { addRepository } from "../../services/projectService";

interface Props {
  onAdded: () => void;
}

export default function AddRepositoryModal({ onAdded }: Props) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");

  async function handleSubmit() {

    if (!name || !language) {
      alert("Repository name and language are required.");
      return;
    }

    try {

      await addRepository({
        name,
        description,
        language,
        status: "Ready",
      });

      setName("");
      setDescription("");
      setLanguage("");

      onAdded();

    } catch (error) {

      console.error(error);

      alert("Unable to save repository.");

    }

  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

      <h2 className="mb-6 text-2xl font-semibold">
        Add Repository
      </h2>

      <div className="space-y-4">

        <input
          className="w-full rounded bg-[#1F2937] p-3"
          placeholder="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full rounded bg-[#1F2937] p-3"
          placeholder="Description (optional)"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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