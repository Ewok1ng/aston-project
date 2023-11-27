import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Header, Loader } from '../../components';
import { useAppSelector, useAuth } from '../../hooks';

import s from './layout.module.css';

function Layout() {
	const { isAuth, logout } = useAuth();
	const isUserLoading = useAppSelector(state => state.userReducer.isLoading);

	return (
		<div className={s.layout}>
			{isUserLoading ? (
				<Loader className={s.loader} />
			) : (
				<>
					<Header isAuth={isAuth} logout={logout} />
					<main className={s.main}>
						<div className="container">
							<Suspense fallback={<Loader />}>
								<Outlet />
							</Suspense>
						</div>
					</main>
				</>
			)}
			<Toaster />
		</div>
	);
}

export default Layout;
