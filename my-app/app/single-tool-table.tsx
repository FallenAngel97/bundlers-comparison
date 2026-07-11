"use client"
import { Card, Table } from "antd";
import { calculateTotalDeps, extractVersion } from '../view-converters';
import type { ToolTableProps } from '../tool-table-props';

const columns = [
  {
    title: 'RAM',
    dataIndex: 'ram',
    key: 'ram',
  },
  {
    title: 'CPU',
    dataIndex: 'cpu',
    key: 'cpu',
  },
  {
    title: 'Seconds',
    dataIndex: 'seconds',
    key: 'seconds',
  },
];

export const SingleToolTable = ({
  title,
  stats,
  version,
  dependencies,
}: ToolTableProps) => (
  <Card
    title={`${title.replace(".log", "")} ${extractVersion(version)}`}
    extra={`${calculateTotalDeps(dependencies)} dependencies`}
  >
    <Table
      columns={columns}
      dataSource={stats}
      pagination={false}
      size="small"
      rowKey={(_, index) => index!}
    />
  </Card>
);
