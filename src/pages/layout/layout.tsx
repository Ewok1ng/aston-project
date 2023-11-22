import React from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '../../components';

import s from './layout.module.css';

export function Layout() {
	return (
		<div className={s.layout}>
			<Header />
			<main className={s.main}>
				<div className="container">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
