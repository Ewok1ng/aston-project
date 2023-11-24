import React, { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks';
import { Loader } from '../components';

import { Private } from './private';

const Main = lazy(() => import('../pages/main/main'));
const History = lazy(() => import('../pages/history/history'));
const Layout = lazy(() => import('../pages/layout/layout'));
const Comics = lazy(() => import('../pages/comics/comics'));
const Favourite = lazy(() => import('../pages/favourite/favourite'));
const Register = lazy(() => import('../pages/register/register'));
const Login = lazy(() => import('../pages/login/login'));
const Search = lazy(() => import('../pages/search/search'));

export default function PublicRoutes() {
	const { isAuth } = useAuth();

	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="comics/:comicsId" element={<Comics />} />
					<Route path="search" element={<Search />} />
					<Route path="signup" element={<Register />} />
					<Route path="signin" element={<Login />} />
					<Route element={<Private isAuth={isAuth} />}>
						<Route path="history" element={<History />} />
						<Route path="favourite" element={<Favourite />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
}
