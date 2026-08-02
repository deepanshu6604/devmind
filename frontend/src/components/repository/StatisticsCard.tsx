import type { Scan } from "../../types/analysis";

interface Props {
  scan: Scan;
}

export default function StatisticsCard({ scan }: Props) {
  const extensions = scan.extensions ?? {};

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        📊 Statistics
      </h2>

      <p className="text-3xl font-bold">
        {scan.files ?? 0}
      </p>

      <p className="text-gray-400">
        Total Files
      </p>

      <div className="mt-6">

        <p className="mb-2 font-medium">
          Extensions
        </p>

        {Object.keys(extensions).length === 0 ? (

          <p className="text-sm text-gray-500">
            Extension data not available.
          </p>

        ) : (

          <div className="space-y-1 text-sm">

            {Object.entries(extensions).map(([ext, count]) => (

              <div
                key={ext}
                className="flex justify-between"
              >

                <span>
                  {ext || "(no extension)"}
                </span>

                <span>
                  {count}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}