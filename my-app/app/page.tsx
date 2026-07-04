import { calculateTotalDeps, ToolTableProps, metricsParsed } from '../disk_operations';
import { Table } from 'antd';

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

const SharedResults = ({ metrics }: { metrics: ToolTableProps[]}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name / version</th>
					<th>Dependencies</th>
				</tr>
			</thead>
			<tbody>
				{metrics.map((metric) => (
					<tr>
						<td>{metric.title} {extractVersion(metric.version)}</td>
						<td>{calculateTotalDeps(metric.dependencies)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}


function extractVersion(rawVersion: string) {
	return `v${rawVersion?.replace("~", "")?.replace("^", "")}`
}

const SingleToolTable = ({ title, stats, version, dependencies }: ToolTableProps) => {
	return (
		<div>
			<h2>{title?.replace(".log", "")} {extractVersion(version)}</h2>
			<span>Has {calculateTotalDeps(dependencies)} dependencies</span>
			<Table dataSource={stats} columns={columns} />
		</div>
	);
}

export default function Home() {
  return (
    <div className="">
      <main className="">
				<h1>Comparison of JavaScript bundlers</h1>
				{metricsParsed.map(((m, index) =>
					<SingleToolTable key={index} {...m}  />
				))}
				<SharedResults metrics={metricsParsed} />
      </main>
    </div>
  );
}
