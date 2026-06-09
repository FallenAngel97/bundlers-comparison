//import { calculateTotalDeps,  ToolTableProps } from '../disk_operations';
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

const metricsParsed= [
	{title: '', stats: {}, version: '', dependencies: {}}
]

const SingleToolTable = ({ title, stats, version, dependencies }: any) => {
	console.log({ title });
	return (
		<div>
			<h2>{title.replace(".log", "")} v{version.replace("~", "").replace("^", "")}</h2>
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
