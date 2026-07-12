import type { ToolTableProps } from "./tool-table-props";

export function calculateTotalDeps(dependencies: Record<any, any>) {
	const classicDepsCount = Object.keys(dependencies?.dependencies || {}).length;
	const devDepsCount = Object.keys(dependencies?.devDependencies || {}).length;
	return classicDepsCount + devDepsCount;
}

export function computeTotalMetric(
  stats: ToolTableProps["stats"],
  key: keyof ToolTableProps["stats"][0]
) {
  const total = stats.reduce((sum, stat) => {
    return sum + parseMetricValue(stat[key]);
  }, 0);

  return Number((total / stats.length).toFixed(2));
}

export function parseMetricValue(value: string | number) {
  if (typeof value === "number") {
    return value;
  }

  // CPU: "194%" -> 194
  if (value.includes("%")) {
    return Number(value.replace("%", ""));
  }

  // RAM: "372.27 MB" -> 372.27
  if (value.includes("MB")) {
    return Number(value.replace("MB", "").trim());
  }

  // Time: "0:01.60" -> seconds
  if (value.includes(":")) {
    const [minutes, seconds] = value.split(":");
    return Number(minutes) * 60 + Number(seconds);
  }

  return Number(value);
}

export function extractVersion(rawVersion: string) {
		return `v${rawVersion?.replace("~", "")?.replace("^", "")}`
}

