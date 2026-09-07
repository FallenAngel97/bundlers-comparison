import { denoMetricsParsed } from "@/disk_operations";
import { RuntimeView } from "../runtime-view";

export default function DenoPage() {
  return <RuntimeView metrics={denoMetricsParsed} runtimeName="Deno" />;
}
