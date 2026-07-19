"use client";
import { Card, Statistic, Tooltip } from "antd";
import { WarningOutlined } from "@ant-design/icons";
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
	const isDeprecated = name.toLowerCase() === "snowpack";

	return (
		<Card
			title={
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
					{isDeprecated && (
							<Tooltip title="Snowpack is unsupported as of 2022">
								<span style={{ 
									display: 'inline-flex', 
									alignItems: 'center', 
									gap: '4px', 
									backgroundColor: '#fffbe6', 
									color: '#d46b08', 
									border: '1px solid #ffe58f', 
									padding: '2px 8px', 
									borderRadius: '4px', 
									fontSize: '12px',
									fontWeight: 'normal'
								}}>
									<WarningOutlined style={{ color: '#faad14' }} />
									Deprecated
								</span>
							</Tooltip>
						)}
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
