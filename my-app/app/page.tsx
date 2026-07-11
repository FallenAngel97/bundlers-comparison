import { metricsParsed } from '../disk_operations';
import { SummaryCard } from './summary-card';
import { SingleToolTable } from './single-tool-table';
import { ComparisonTable } from './comparison-table';

export default function Home() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Comparison of JavaScript Bundlers</h1>

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
