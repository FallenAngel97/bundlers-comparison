import { ram, cores, node_version } from './config.json';

export const EnvironmentBanner = () => (
	<div id="environment-banner" className="environment-banner">
		<div>
			<span className="label">Node.js</span>
			<span id="node-version">{node_version}</span>
		</div>
		<div>
			<span className="label">RAM</span>
			<span id="ram-size">{ram}</span>
		</div>
		<div>
			<span className="label">CPU Cores</span>
			<span id="cpu-cores">{cores}</span>
		</div>
	</div>
)

