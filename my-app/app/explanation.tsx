import { Alert } from 'antd';

export const Explanation = () => (
	<div>
		On this page you will see the benchmarked JavaScript bundlers which are being launched 
		towards a simple index.jsx and measured 10 times the execution time, memory used, 
		and percentage of CPU. Github Runner is <i>ubuntu-latest</i>.

		<Alert title="💡 Understanding CPU Metrics" description="A CPU utilization score exceeding 100% indicates multi-core execution on the Linux benchmark environment. For instance, a 200% reading means the process fully utilized the processing capacity of 2 parallel CPU cores during execution. " type="info" />
	</div>
);

