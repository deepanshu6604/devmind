import type { Summary } from "../../types/analysis";

interface Props {
  summary: Summary;
}

export default function SummaryCard({ summary }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        📋 Project Summary
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-400">Project</p>
          <p className="font-semibold">{summary.project_name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Type</p>
          <p>{summary.project_type}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Frontend</p>
          <p>{summary.frontend ?? "Not Detected"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Backend</p>
          <p>{summary.backend ?? "Not Detected"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Size</p>
          <p>{summary.estimated_size}</p>
        </div>

      </div>
    </div>
  );
}