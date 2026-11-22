import { complexMetricsParsed } from "@/disk_operations";
import { RuntimeView } from "../runtime-view";

export default function ComplexPage() {
  return (
    <RuntimeView
      metrics={complexMetricsParsed}
      runtimeName="Node.js"
      projectName="Complex project"
      commandPrefix="build:complex"
    />
  );
}
