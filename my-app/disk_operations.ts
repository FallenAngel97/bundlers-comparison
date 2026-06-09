import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { devDependencies } from '../package.json';

const timeDir = join(process.cwd(), "../time");
const dirContents = readdirSync(timeDir);

console.log({ dirContents });

export type ToolTableProps = {
	title: string;
	dependencies: Record<any, any>;
	version: string;
	stats: Record<'cpu'|'ram', string>[]
}

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
	console.log({ cleanedStats });

  for (let i = 0; i < cleanedStats.length; i += 2) {
    const ramLine = cleanedStats[i].replace("Peak RAM: ", "");
    const cpuLine = cleanedStats[i + 1].replace("CPU Load: ", "");

    stats.push({ ram: ramLine, cpu: cpuLine });
  }

  return stats;
}

function getDependenciesOfPackage(packageName: keyof typeof devDependencies) {
	let depName = '';
  if (devDependencies[packageName]) {
    depName = packageName;
  } else {
		// Try fuzzy match (handles @scoped packages)
		depName = Object.entries(devDependencies).find(([dep]) =>
			dep.toLowerCase().includes(packageName)
		)?.toString().split(',')[0] || '';
	}
	const dependencyPackageJSON = JSON.parse(readFileSync(`../node_modules/${depName}/package.json`).toString());
	return dependencyPackageJSON;
}

export const metricsParsed = dirContents.map((file) => {
	return {
		title: file,
		version: findToolVersion(file),
		dependencies: getDependenciesOfPackage(file.replace(".log", "") as keyof typeof devDependencies),
		stats: convertStringToStats(readFileSync('../time/' + file).toString())
	};
});


export function calculateTotalDeps(dependencies: Record<any, any>) {
	const classicDepsCount = Object.keys(dependencies?.dependencies || {}).length;
	const devDepsCount = Object.keys(dependencies?.devDependencies || {}).length;
	return classicDepsCount + devDepsCount;
}

