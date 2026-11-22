import { normalizeLink } from "../excalidraw/packages/common/src/url";
import { average, clamp } from "../excalidraw/packages/math/src/utils";
import { generateKeyBetween } from "../excalidraw/packages/fractional-indexing/src/index";

const values = [12, 24, 48, 96];

export const complexBenchmarkValue = {
  average: average(values[0], values[values.length - 1]),
  clamped: clamp(128, 0, 100),
  key: generateKeyBetween(null, null),
  link: normalizeLink("https://excalidraw.com"),
};

console.log(complexBenchmarkValue);
