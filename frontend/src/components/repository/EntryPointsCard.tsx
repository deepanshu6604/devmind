import type { Summary } from "../../types/analysis";

interface Props {
  entryPoints: Summary["entry_points"];
}

export default function EntryPointsCard({ entryPoints }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        🚀 Entry Points
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-400">Frontend</p>
          <code className="text-blue-400">
            {entryPoints.frontend ?? "Not Found"}
          </code>
        </div>

        <div>
          <p className="text-sm text-gray-400">Backend</p>
          <code className="text-blue-400">
            {entryPoints.backend ?? "Not Found"}
          </code>
        </div>

      </div>
    </div>
  );
}