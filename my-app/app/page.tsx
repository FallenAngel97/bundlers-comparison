import { nodeMetricsParsed } from "@/disk_operations";
import { RuntimeView } from "./runtime-view";

export default function NodePage() {
  return <RuntimeView metrics={nodeMetricsParsed} runtimeName="Node.js" />;
}
