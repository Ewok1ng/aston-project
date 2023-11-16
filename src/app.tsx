import React from 'react';

import Routes from './routes/routes';
import { useAuth } from './hooks';

function App() {
	const { auth } = useAuth();
	React.useEffect(() => {
		const unsub = auth();

		return () => {
			unsub?.();
		};
	}, []);

	return (
		<div className="app">
			<Routes />
		</div>
	);
}

export default App;
