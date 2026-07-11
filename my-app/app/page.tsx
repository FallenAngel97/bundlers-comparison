import { metricsParsed } from '../disk_operations';
import { SummaryCard } from './summary-card';
import { SingleToolTable } from './single-tool-table';
import { ComparisonTable } from './comparison-table';
import { ram, cores, node_version } from './config.json';

export default function Home() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Comparison of JavaScript Bundlers</h1>

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

      <section className="summaryGrid">
        {metricsParsed.map((metric) => (
          <SummaryCard key={metric.title} metric={metric} />
        ))}
      </section>

      <h2>Comparison</h2>

      <ComparisonTable metrics={metricsParsed} />

      <h2 style={{ marginTop: 40 }}>Benchmark Runs</h2>

      <section className="toolGrid">
        {metricsParsed.map((metric) => (
          <SingleToolTable key={metric.title} {...metric} />
        ))}
      </section>
    </main>
  );
}
