"use client";
import { Table } from "antd";
import { ToolTableProps } from '../tool-table-props';
import { computeTotalMetric, calculateTotalDeps, extractVersion } from '../view-converters';

const comparisonColumns = [
  {
    title: "Bundler",
    dataIndex: "name",
  },
  {
    title: "Version",
    dataIndex: "version",
  },
  {
    title: "Dependencies",
    dataIndex: "dependencies",
    sorter: (a: any, b: any) => a.dependencies - b.dependencies,
  },
  {
    title: "CPU %",
    dataIndex: "cpu",
    sorter: (a: any, b: any) => a.cpu - b.cpu,
  },
  {
    title: "RAM MB",
    dataIndex: "ram",
    sorter: (a: any, b: any) => a.ram - b.ram,
  },
  {
    title: "Seconds",
    dataIndex: "seconds",
    sorter: (a: any, b: any) => a.seconds - b.seconds,
  },
];

export function ComparisonTable({
  metrics,
}: {
  metrics: ToolTableProps[];
}) {
  const data = metrics.map((metric) => ({
    key: metric.title,
    name: metric.title.replace(".log", ""),
    version: extractVersion(metric.version),
    dependencies: calculateTotalDeps(metric.dependencies),
    cpu: computeTotalMetric(metric.stats, "cpu"),
    ram: computeTotalMetric(metric.stats, "ram"),
    seconds: computeTotalMetric(metric.stats, "seconds"),
  }));

  return (
    <Table
      columns={comparisonColumns}
      dataSource={data}
      pagination={false}
    />
  );
}
