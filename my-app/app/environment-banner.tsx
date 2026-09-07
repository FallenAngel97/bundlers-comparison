import { ram, cores, node_version, bun_version, deno_version } from './config.json';

interface EnvironmentBannerProps {
  runtimeName?: 'Node.js' | 'Bun' | 'Deno';
  runtimeVersion?: string;
}

export const EnvironmentBanner = ({
  runtimeName = 'Node.js',
  runtimeVersion,
}: EnvironmentBannerProps) => {
  // Determine version fallback based on selected runtime
  const getVersion = () => {
    if (runtimeVersion) return runtimeVersion;
    switch (runtimeName) {
      case 'Bun':
        return (bun_version as string) || '1.4.0';
      case 'Deno':
        return (deno_version as string) || '2.9.6';
      case 'Node.js':
      default:
        return node_version;
    }
  };

  return (
    <div id="environment-banner" className="environment-banner">
      <div>
        <span className="label">{runtimeName}</span>
        <span id="runtime-version">{getVersion()}</span>
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
  );
};
