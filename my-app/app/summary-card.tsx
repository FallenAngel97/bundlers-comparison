import { Card, Statistic } from "antd";
import { ToolTableProps } from '../tool-table-props';
import { extractVersion, calculateTotalDeps, computeTotalMetric } from '../view-converters';


interface SummaryCardProps {
  metric: ToolTableProps;
}

export function SummaryCard({ metric }: SummaryCardProps) {
  return (
    <Card
      title={`${metric.title.replace(".log", "")} ${extractVersion(metric.version)}`}
    >
      <Statistic
        title="Dependencies"
        value={calculateTotalDeps(metric.dependencies)}
      />

      <Statistic
        title="Average CPU"
        value={computeTotalMetric(metric.stats, "cpu")}
        suffix="%"
      />

      <Statistic
        title="Average RAM"
        value={computeTotalMetric(metric.stats, "ram")}
        suffix=" MB"
      />

      <Statistic
        title="Average Time"
        value={computeTotalMetric(metric.stats, "seconds")}
        suffix=" s"
      />
    </Card>
  );
}
