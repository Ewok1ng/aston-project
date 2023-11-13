import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main, History, Layout, Comics, Favourite } from './pages';

function App() {
	return (
		<div className="app">
			{/* REFACTOR */}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="comics/:comicsId" element={<Comics />} />
					<Route path="history" element={<History />} />
					<Route path="favourite" element={<Favourite />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
