import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Routes from './routes/routes';
import { useAuth } from './hooks';
import { SearchContext } from './context/search-context';
import { Fallback } from './components';

function App() {
	const [searchValue, setSearchValue] = React.useState('');

	const { auth } = useAuth();
	React.useEffect(() => {
		const unsub = auth();

		return () => {
			unsub?.();
		};
	}, []);

	return (
		<ErrorBoundary FallbackComponent={Fallback}>
			<div className="app">
				<SearchContext.Provider value={{ searchValue, setSearchValue }}>
					<Routes />
				</SearchContext.Provider>
			</div>
		</ErrorBoundary>
	);
}

export default App;
