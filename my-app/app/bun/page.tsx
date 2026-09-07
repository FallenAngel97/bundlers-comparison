import { bunMetricsParsed } from "@/disk_operations";
import { RuntimeView } from "../runtime-view";

export default function BunPage() {
  return <RuntimeView metrics={bunMetricsParsed} runtimeName="Bun" />;
}
