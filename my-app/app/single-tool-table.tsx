"use client"
import { Card, Table } from "antd";
import { calculateTotalDeps, extractVersion } from '../view-converters';
import type { ToolTableProps } from '../tool-table-props';
// Import the package.json file from the directory above
import pkg from '../../package.json';

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
}: ToolTableProps) => {
  const toolName = title.replace(".log", "").toLowerCase();
  
  const scriptKey = `build:${toolName}` as keyof typeof pkg.scripts;
  const commandUsed = pkg.scripts[scriptKey] || "Command not found";

  return (
    <Card
      title={`${title.replace(".log", "")} ${extractVersion(version)}`}
      extra={`${calculateTotalDeps(dependencies)} dependencies`}
    >
      <div style={{ 
        marginBottom: 12, 
        padding: '6px 10px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: 4,
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#555',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <strong>Command:</strong> <code>{commandUsed}</code>
      </div>

      <Table
        columns={columns}
        dataSource={stats}
        pagination={false}
        size="small"
        rowKey={(_, index) => index!}
      />
    </Card>
  );
};
