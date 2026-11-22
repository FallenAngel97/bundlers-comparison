# Copilot instructions

## Repository shape

This repository contains two connected projects:

- The repository root is the benchmark harness. `src/index.jsx` is the same small React entry point bundled by each tool. Each `build:<tool>` script in the root `package.json` invokes one bundler configuration and writes a minified artifact under `dist/`.
- `bundler-configs/` is the single location for root and Excalidraw benchmark configuration files. Root scripts pass explicit config paths; configs must resolve source and output paths relative to the repository root rather than assuming the config directory is the working directory.
- `excalidraw/` is a git submodule pinned to `https://github.com/excalidraw/excalidraw.git`. The complex benchmark draws its TypeScript graph from that checkout through `benchmarks/complex-entry.ts`; its Vite, Webpack, Rollup, and Rolldown configurations live beside the simple-project configs.
- `my-app/` is a separate Next.js App Router site. It reads benchmark logs from `../time_node`, `../time_bun`, and `../time_deno` at build time, derives averages and dependency counts, and exports a static site for GitHub Pages.

The GitHub Actions workflow is the source of truth for the production data flow: three jobs run the root benchmarks under Node, Deno, and Bun, each tool is run 10 times, artifacts are uploaded, and `compile-app` downloads those artifacts before building `my-app`. `my-app/app/config.json` is generated in CI and is intentionally ignored; it supplies runtime versions, host resources, and the generation timestamp.

## Build, benchmark, and validation commands

Install root dependencies with the lockfile:

```bash
yarn install --frozen-lockfile
```

Run one root bundler build while iterating:

```bash
yarn build:esbuild
yarn build:rollup
yarn build:webpack
yarn build:farm
yarn build:rspack
yarn build:parcel
yarn build:snowpack
yarn build:rolldown
yarn build:deno_native   # requires Deno
yarn build:bun_native    # requires Bun
```

There is no aggregate root build script, test script, or lint script. The CI benchmark is the effective integration check: each runtime executes the applicable `build:*` command 10 times under `/usr/bin/time -v` and writes three-line records (`Peak RAM`, `CPU Load`, `Seconds`) to `time_<runtime>/<tool>.log`. To reproduce a single measured run locally, use the runtime-specific command, for example:

```bash
/usr/bin/time -v yarn build:esbuild
```

The workflow also has a Dependabot-only check that expects exactly eight Node benchmark log files and exactly ten metric records per file. Keep that expectation synchronized if the benchmark matrix changes.

The complex-project job initializes the Excalidraw submodule, installs its workspace dependencies, and runs `build:complex:vite`, `build:complex:webpack`, `build:complex:rollup`, and `build:complex:rolldown` ten times. Its logs are uploaded as `complex-benchmark-logs` under `time_complex/` and are consumed by the dashboard's Complex project tab.

For the dashboard:

```bash
cd my-app
yarn install --frozen-lockfile
yarn dev       # local development at http://localhost:3000
yarn lint      # ESLint
yarn build     # static export; requires benchmark logs and app/config.json
yarn start     # serve a completed Next build
```

`my-app` has no configured unit-test runner or single-test command. Use `yarn lint` and `yarn build` for dashboard validation, and run the affected root `build:<tool>` command for benchmark changes.

## Architecture and data contracts

- Root bundler configs all consume `src/index.jsx` and target browser production output. Webpack and Rspack use Babel plus Terser; Rollup uses node resolution/CommonJS/Babel/Terser; Rolldown and the native Bun/Deno commands have their own output paths. Do not treat the generated `dist/` files as source.
- The workflow's runtime jobs deliberately use different package managers/runners (`yarn`, `deno run`, and `bun run`) but the same root scripts. Native Bun and Deno builds are additional entries in their respective runtime matrices.
- `my-app/disk_operations.ts` maps log filenames to tool versions and installed package metadata, parses every three log lines into typed stats, and exports one dataset per runtime. This happens during the Next build, not in the browser.
- `RuntimeView` is shared by the Node (`/`), Bun (`/bun`), and Deno (`/deno`) routes. The view combines summary cards, average comparison tables/charts, per-run tables, architecture notes, and computed insights. `layout.tsx` supplies shared navigation, metadata, JSON-LD, and the generated environment banner.
- Metric strings are normalized centrally in `view-converters.ts`: CPU percentages become numbers, RAM values are converted from MB strings, and `m:ss.xx` durations become seconds. Preserve these input formats when changing the workflow parser or dashboard calculations.
- The Next config uses `output: 'export'`, a `/bundlers-comparison` base path, and unoptimized images because deployment is GitHub Pages.

## Repository-specific conventions

- Bundler identity is the lowercase log basename (for example `esbuild.log`). It is also used to find the `build:<name>` script and package metadata. If a tool is renamed, update all related script names, workflow invocations, log names, and dashboard mappings together.
- Adding or removing a bundler requires coordinated edits to the root `package.json`, its config/command, all applicable runtime lists in `.github/workflows/build-static-site.yml`, the Dependabot log-count check, and dashboard icon/technology mappings. Keep the three runtime datasets structurally compatible.
- Complex-project tools use the `build:complex:<tool>` script prefix and `time_complex/<tool>.log` filenames. Keep that prefix and filename contract aligned with `disk_operations.ts` and `SingleToolTable`.
- Benchmark runs must remain comparable: use the shared `src/index.jsx` entry point, production/minified output where the existing config does so, and do not add tool-specific application code to the benchmark input.
- Keep benchmark logs and generated build output out of commits; they are ignored artifacts consumed between CI jobs. The dashboard's generated `my-app/app/config.json` is also not a source file.
- Dashboard components that use Ant Design, Nivo, router hooks, or browser state are marked `"use client"`. Keep filesystem parsing and package metadata access in build-time/server-side modules such as `disk_operations.ts`, not in client components.
- Dependency counts intentionally inspect each bundler package's own `dependencies` and `devDependencies`; version lookup has exact and fuzzy matching for log names. Preserve that behavior when introducing scoped or renamed packages.
- The benchmark description and UI report ten runs and averages. If the sampling count or metric schema changes, update the workflow, parser, validation check, and explanatory UI together.
