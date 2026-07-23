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
      className="cursor-pointer rounded-xl border border-gray-800 bg-[#111827] p-5 hover:border-blue-500 hover:scale-[1.02] transition-all duration-200"
    >
      <h2 className="text-xl font-semibold">
        📁 {repository.name}
      </h2>

      <p className="mt-2 text-gray-400">
        {repository.language}
      </p>

      <div className="mt-4 flex justify-between text-sm">
        <span>{repository.files} files</span>

        <span className="text-green-400">
          {repository.status}
        </span>
      </div>
    </div>
  );
}