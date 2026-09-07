import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { devDependencies } from '../package.json';
import { bun_version, deno_version } from './app/config.json';
import type { ToolTableProps } from './tool-table-props';

const nodeTimeDir = join(process.cwd(), "../time_node");
const bunTimeDir = join(process.cwd(), "../time_bun");
const denoTimeDir = join(process.cwd(), "../time_deno");

const nodeDirContents = readdirSync(nodeTimeDir);
const bunDirContents = readdirSync(bunTimeDir);
const denoDirContents = readdirSync(denoTimeDir);

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
	const dependencyPackageJSON = JSON.parse(readFileSync(`../node_modules/${depName}/package.json`).toString());
	return dependencyPackageJSON;
}

export const nodeMetricsParsed = nodeDirContents.map((file) => {
	return {
		title: file,
		version: findToolVersion(file),
		dependencies: getDependenciesOfPackage(file.replace(".log", "") as keyof typeof devDependencies),
		stats: convertStringToStats(readFileSync('../time_node/' + file).toString())
	};
});

export const bunMetricsParsed = bunDirContents.map((file) => {
	let version = '';
	let dependencies = {};
	if (file.indexOf('bun') > -1) {
		version = bun_version;
		dependencies = {};
	} else {
		version = findToolVersion(file),
		dependencies = getDependenciesOfPackage(file.replace(".log", "") as keyof typeof devDependencies);
	}
	return {
		title: file,
		version,
		dependencies,
		stats: convertStringToStats(readFileSync('../time_bun/' + file).toString())
	}
});

export const denoMetricsParsed = denoDirContents.map((file) => {
	let version = '';
	let dependencies = {};
	if (file.indexOf('deno') > -1) {
		version = deno_version;
		dependencies = {};
	} else {
		version = findToolVersion(file),
		dependencies = getDependenciesOfPackage(file.replace(".log", "") as keyof typeof devDependencies);
	}
	return {
		title: file,
		version,
		dependencies,
		stats: convertStringToStats(readFileSync('../time_deno/' + file).toString())
	}
});
