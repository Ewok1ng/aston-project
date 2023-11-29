import React, { lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks';

import { Private } from './private';

const Main = lazy(() => import('../pages/main/main'));
const History = lazy(() => import('../pages/history/history'));
const Layout = lazy(() => import('../pages/layout/layout'));
const Comics = lazy(() => import('../pages/comics/comics'));
const Favourite = lazy(() => import('../pages/favourite/favourite'));
const Register = lazy(() => import('../pages/register/register'));
const Login = lazy(() => import('../pages/login/login'));
const Search = lazy(() => import('../pages/search/search'));
const NotFound = lazy(() => import('../pages/not-found/not-found'));

export default function PublicRoutes() {
	const { isAuth } = useAuth();

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Main />} />
				<Route path="comics/:comicsId" element={<Comics />} />
				<Route path="search" element={<Search />} />
				<Route path="signup" element={<Register />} />
				<Route path="signin" element={<Login />} />
				<Route path="*" element={<NotFound />} />
				<Route element={<Private isAuth={isAuth} />}>
					<Route path="history" element={<History />} />
					<Route path="favourite" element={<Favourite />} />
				</Route>
			</Route>
		</Routes>
	);
}
