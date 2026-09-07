"use client";

import { EnvironmentBanner } from "./environment-banner";
import { Explanation } from "./explanation";
import { SummaryCard } from "./summary-card";
import { ComparisonTable } from "./comparison-table";
import { SingleToolTable } from "./single-tool-table";
import { ArchitectureComparison } from "./architecture-comparison";
import { InsightsBlock } from "./summary-insights";
import type { ToolTableProps } from "../tool-table-props";

interface RuntimeViewProps {
  metrics: Array<{
    title: string;
    version: string;
    dependencies: Record<string, any>;
    stats: ToolTableProps["stats"];
  }>;
  runtimeName: "Node.js" | "Bun" | "Deno";
}

export function RuntimeView({ metrics, runtimeName }: RuntimeViewProps) {
  return (
    <main style={{ padding: 32 }}>
      <h1>Comparison of JavaScript Bundlers ({runtimeName})</h1>
      <EnvironmentBanner runtimeName={runtimeName} />
      <Explanation />

      <section className="summaryGrid">
        {metrics.map((metric) => (
          <SummaryCard key={metric.title} metric={metric} />
        ))}
      </section>

      <h2>Comparison</h2>
      <ComparisonTable metrics={metrics} />

      <h2 style={{ marginTop: 40 }}>Benchmark Runs</h2>

      <section className="toolGrid">
        {metrics.map((metric) => (
          <SingleToolTable key={metric.title} {...metric} />
        ))}
      </section>

      <ArchitectureComparison />
      <InsightsBlock data={metrics} />
    </main>
  );
}
