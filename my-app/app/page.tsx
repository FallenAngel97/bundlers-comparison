import { calculateTotalDeps, ToolTableProps, metricsParsed } from '../disk_operations';
//
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


const SingleToolTable = ({ title, stats, version, dependencies }: any) => {
	return (
		<div>
			<h2>{title?.replace(".log", "")} v{version?.replace("~", "")?.replace("^", "")}</h2>
			<table>
				<thead>
					<tr>
						<th>RAM</th>
						<th>CPU</th>
						<th>Seconds</th>
					</tr>
				</thead>
				<tbody>
					{stats.map(({ ram, cpu, seconds }: { ram: string, cpu: string, seconds: string}, index: number) => (
						<tr key={index}>
							<td>{ram}</td>
							<td>{cpu}</td>
							<td>{seconds}</td>
						</tr>
					))}
				</tbody>
			</table>
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
