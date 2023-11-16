import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
	Main,
	History,
	Layout,
	Comics,
	Favourite,
	Register,
	Login
} from './pages';
import { useAuth } from './hooks';

function App() {
	const { auth } = useAuth();
	React.useEffect(() => {
		auth();
	}, []);

	return (
		<div className="app">
			{/* REFACTOR */}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="comics/:comicsId" element={<Comics />} />
					<Route path="history" element={<History />} />
					<Route path="favourite" element={<Favourite />} />
					<Route path="signup" element={<Register />} />
					<Route path="signin" element={<Login />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
