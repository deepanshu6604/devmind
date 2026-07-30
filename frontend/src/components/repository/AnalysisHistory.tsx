interface Props {
  history: any[];
}

export default function AnalysisHistory({
  history,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Analysis History
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-400">
          No previous analyses.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  {item.project_type}
                </span>

                <span className="text-gray-400">
                  {item.created_at}
                </span>
              </div>

              <div className="mt-3 flex gap-4 text-sm">
                <span>
                  Files: {item.total_files}
                </span>

                <span>
                  Size: {item.estimated_size}
                </span>
              </div>

              <div className="mt-2">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                  {item.stack}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}