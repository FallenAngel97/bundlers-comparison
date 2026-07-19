import { metricsParsed } from '../disk_operations';
import { SummaryCard } from './summary-card';
import { SingleToolTable } from './single-tool-table';
import { ComparisonTable } from './comparison-table';
import { ram, cores, node_version } from './config.json';
import { InsightsBlock } from './summary-insights';

const Explanation = () => (
	<p>
		On this page you will see the benchmarked JavaScript bundlers which are being launched 
		towards a simple index.jsx and measured 10 times the execution time, memory used, 
		and percentage of CPU. Percentage &gt;100% means, that the process is running on 
		multiple cores of the CPU. Github Runner is <i>ubuntu-latest</i>.
	</p>
);

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

			<Explanation />

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
			<InsightsBlock data={metricsParsed} />
    </main>
  );
}
