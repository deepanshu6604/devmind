import type { Repository } from "../../data/repositories";

interface Props {
  repository: Repository;
}

export default function RepositoryCard({ repository }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5 hover:border-blue-500 transition cursor-pointer">
      <h2 className="text-xl font-semibold">
        {repository.name}
      </h2>

      <p className="mt-2 text-gray-400">
        {repository.language}
      </p>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>{repository.files} files</span>

        <span>{repository.status}</span>
      </div>
    </div>
  );
}