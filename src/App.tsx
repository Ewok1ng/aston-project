import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { Main, History } from './pages';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<header>
					<Link to={'/'}>Main</Link>
					<Link to={'/history'}>History</Link>
				</header>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/history" element={<History />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
