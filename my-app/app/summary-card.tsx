import { Card, Statistic } from "antd";
import { ToolTableProps } from "../tool-table-props";
import {
	extractVersion,
	calculateTotalDeps,
	computeTotalMetric,
} from "../view-converters";
import { iconsPath } from "./icons";
import Image from "next/image";

interface SummaryCardProps {
	metric: ToolTableProps;
}

export function SummaryCard({ metric }: SummaryCardProps) {
	const name = metric.title.replace(".log", "") as keyof typeof iconsPath;
	const iconSrc = iconsPath[name];

	return (
		<Card
			title={
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					{iconSrc && (
						<Image
							style={{ width: "20px", height: "20px", objectFit: "contain" }}
							src={iconSrc}
							alt={`${name} logo`}
						/>
					)}
					<span>{`${name} ${extractVersion(metric.version)}`}</span>
				</div>
			}
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
