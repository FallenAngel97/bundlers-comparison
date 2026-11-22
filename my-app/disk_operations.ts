import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { devDependencies } from '../package.json';
import { bun_version, deno_version } from './app/config.json';
import type { ToolTableProps } from './tool-table-props';

const rootDir = join(process.cwd(), "..");
const nodeTimeDir = join(rootDir, "time_node");
const bunTimeDir = join(rootDir, "time_bun");
const denoTimeDir = join(rootDir, "time_deno");
const complexTimeDir = join(rootDir, "time_complex");

function findToolVersion(fileName: string) {
  const base = fileName.replace(".log", "").toLowerCase() as keyof typeof devDependencies;

  // Try exact match first
  if (devDependencies[base]) {
    return devDependencies[base];
  }

  // Try fuzzy match (handles @scoped packages)
  const match = Object.entries(devDependencies).find(([dep]) =>
    dep.toLowerCase().includes(base)
  );

  return match ? match[1] : "(unknown)";
}

function convertStringToStats(statsString: string): ToolTableProps['stats'] {
	const cleanedStats = statsString.split("\n").filter(n => n!="");

  const stats: ToolTableProps['stats'] = [];

  for (let i = 0; i < cleanedStats.length; i += 3) {
    const ramLine = cleanedStats[i].replace("Peak RAM: ", "");
    const cpuLine = cleanedStats[i + 1].replace("CPU Load: ", "");
		const seconds = cleanedStats[i + 2].replace("Seconds: ", "");

    stats.push({ ram: ramLine, cpu: cpuLine, seconds });
  }

  return stats;
}

function getDependenciesOfPackage(packageName: keyof typeof devDependencies): Record<any, any> {
	let depName = '';
  if (devDependencies[packageName]) {
    depName = packageName;
  } else {
		// Try fuzzy match (handles @scoped packages)
		depName = Object.entries(devDependencies).find(([dep]) =>
			dep.toLowerCase().includes(packageName)
		)?.toString().split(',')[0] || '';
	}
	const dependencyPackageJSON = JSON.parse(readFileSync(join(rootDir, "node_modules", depName, "package.json")).toString());
	return dependencyPackageJSON;
}

function parseMetrics(directory: string, specialVersions: Record<string, string> = {}) {
	const files = readdirSync(directory).filter((file) => file.endsWith(".log"));
	return files.map((file) => {
		const toolName = file.replace(".log", "");
		const packageName = toolName as keyof typeof devDependencies;
		const dependencies = specialVersions[toolName]
			? {}
			: getDependenciesOfPackage(packageName);
		return {
			title: file,
			version: specialVersions[toolName] || findToolVersion(file),
			dependencies,
			stats: convertStringToStats(readFileSync(join(directory, file)).toString()),
		};
	});
}

export const nodeMetricsParsed = parseMetrics(nodeTimeDir);

export const bunMetricsParsed = parseMetrics(bunTimeDir, {
	bun: bun_version,
});

export const denoMetricsParsed = parseMetrics(denoTimeDir, {
	deno: deno_version,
});

export const complexMetricsParsed = parseMetrics(complexTimeDir);
