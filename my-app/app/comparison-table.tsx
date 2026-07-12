"use client";
import { Switch, Table, Tabs } from "antd";
import { ToolTableProps } from '../tool-table-props';
import { computeTotalMetric, calculateTotalDeps, extractVersion, parseMetricValue } from '../view-converters';
import { ResponsiveLine } from '@nivo/line'
import { useState } from "react";

const Chart = ({ data, yLegend }: any) => (
	<div style={{ height: "400px" }}>
	    <ResponsiveLine 
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisBottom={{ legend: 'runs', legendOffset: 36 }}
        axisLeft={{ legend: yLegend, legendOffset: -40 }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 22,
                symbolShape: 'circle'
            }
        ]}
    />
	</div>
);

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
	const [chartVisible, setChartVisible] = useState(true);
  const data = metrics.map((metric) => ({
    key: metric.title,
    name: metric.title.replace(".log", ""),
    version: extractVersion(metric.version),
    dependencies: calculateTotalDeps(metric.dependencies),
    cpu: computeTotalMetric(metric.stats, "cpu"),
    ram: computeTotalMetric(metric.stats, "ram"),
    seconds: computeTotalMetric(metric.stats, "seconds"),
  }));

	const dataForTable = (metricName: 'cpu' | 'ram' | 'seconds') => metrics.map((metrics) => ({
		id: metrics.title.replace(".log", ""),
		data: metrics.stats.map((stat, index) => ({
			x: index + 1,
			y: parseMetricValue(stat[metricName])
		}))
	}));

	function onChange(checked: boolean) {
		setChartVisible(checked);
	}

  return (
		<>
			Show as chart <Switch defaultChecked onChange={onChange} />
			{chartVisible && 
				<Tabs 
					items={[
						{key: "cpu", label: "CPU", children: <Chart data={dataForTable('cpu')} yLegend="CPU" />},
						{key: "ram", label: "RAM", children: <Chart data={dataForTable('ram')} yLegend="RAM" />},
						{key: "time", label: "Time", children: <Chart data={dataForTable('seconds')} yLegend="time" />}
					]} />}
			{!chartVisible && <Table
				columns={comparisonColumns}
				dataSource={data}
				pagination={false}
			/>}
		</>
  );
}
