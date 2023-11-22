import React from 'react';

import Routes from './routes/routes';
import { useAuth } from './hooks';
import { SearchContext } from './context/search-context';

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
		<div className="app">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Routes />
			</SearchContext.Provider>
		</div>
	);
}

export default App;
