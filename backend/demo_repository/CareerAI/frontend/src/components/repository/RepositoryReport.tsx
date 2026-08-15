import type { AnalysisResponse } from "../../types/analysis";

import SummaryCard from "./SummaryCard";
import StackCard from "./StackCard";
import StatisticsCard from "./StatisticsCard";
import EntryPointsCard from "./EntryPointsCard";
import FolderTree from "./FolderTree";

interface Props {
  analysis: AnalysisResponse;
}

export default function RepositoryReport({ analysis }: Props) {
  return (
    <div className="space-y-6">

      {/* Top Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <SummaryCard summary={analysis.summary} />
        <StackCard stack={analysis.stack} />
        <StatisticsCard scan={analysis.scan} />
      </div>

      {/* Middle Row */}
      <EntryPointsCard entryPoints={analysis.summary.entry_points} />

      {/* Bottom Row */}
      <FolderTree tree={analysis.tree} />

    </div>
  );
}