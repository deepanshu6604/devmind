import type { AnalysisResponse } from "../../types/analysis";

interface Props {
  stack: AnalysisResponse["stack"];
}

export default function StackCard({ stack }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        ⚛️ Detected Stack
      </h2>

      <div className="flex flex-wrap gap-3">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}