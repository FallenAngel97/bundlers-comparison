export type ToolTableProps = {
	title: string;
	dependencies: Record<any, any>;
	version: string;
	stats: Record<'cpu'|'ram'|'seconds', string>[]
}

