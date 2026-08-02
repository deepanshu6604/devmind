import type { Repository } from "../../types/repository";
import { useNavigate } from "react-router-dom";

interface Props {
  repository: Repository;
}

export default function RepositoryCard({ repository }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/repository/${repository.id}`)}
      className="cursor-pointer rounded-xl border border-gray-800 bg-[#111827] p-5 transition-all duration-200 hover:border-blue-500 hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          📁 {repository.name}
        </h2>

        {repository.is_demo === 1 && (
          <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs font-semibold">
            DEMO
          </span>
        )}

      </div>

      <p className="mt-3 text-gray-400">
        {repository.description}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-gray-800 px-3 py-1 text-blue-400">
          {repository.language}
        </span>

        <span className="text-green-400">
          {repository.status}
        </span>

      </div>
    </div>
  );
}