import React from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '../../components';
import { useAuth } from '../../hooks';

import s from './layout.module.css';

function Layout() {
	const { isAuth, logout } = useAuth();

	return (
		<div className={s.layout}>
			<Header isAuth={isAuth} logout={logout} />
			<main className={s.main}>
				<div className="container">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default Layout;
