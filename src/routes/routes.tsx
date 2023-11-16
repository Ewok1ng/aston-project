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
} from '../pages';
import { useAuth } from '../hooks';

import { Private } from './private';

export default function PublicRoutes() {
	const { isAuth } = useAuth();
	React.useEffect(() => {
		console.log('isAuth', isAuth);
	});
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Main />} />
				<Route path="comics/:comicsId" element={<Comics />} />
				<Route path="signup" element={<Register />} />
				<Route path="signin" element={<Login />} />
				<Route element={<Private isAuth={isAuth} />}>
					<Route path="history" element={<History />} />
					<Route path="favourite" element={<Favourite />} />
				</Route>
			</Route>
		</Routes>
	);
}
