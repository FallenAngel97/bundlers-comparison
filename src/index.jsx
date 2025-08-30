import { createRoot } from 'react-dom/client';

const App = () => (
	<div>
		Hello from bundlers
	</div>
);

const root = document.getElementById('root');
createRoot(root).render(<App />);
