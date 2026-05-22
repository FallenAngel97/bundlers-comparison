import { Table } from 'antd';
import { calculateTotalDeps, metricsParsed, ToolTableProps } from '../disk_operations';

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
  }
];

const SharedResults = () => {
	return (
		<div></div>
	);
}

const SingleToolTable = ({ title, stats, version, dependencies }: ToolTableProps) => {
	return (
		<div>
			<h2>{title.replace(".log", "")} v{version.replace("~", "").replace("^", "")}</h2>
			<h3>Dependencies: {calculateTotalDeps(dependencies)}</h3>
			<Table columns={columns} dataSource={stats} />
		</div>
	);
}

export default function Home() {
  return (
    <div className="">
      <main className="">
				{metricsParsed.map(((m, index) =>
					<SingleToolTable key={index} {...m}  />
				))}
				<SharedResults />
      </main>
    </div>
  );
}
