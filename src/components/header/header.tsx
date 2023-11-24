import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Search, Logo, Button } from '../../components';

import { ExitIcon } from './exit-icon';
import s from './header.module.css';

interface Props {
	isAuth: boolean;
	logout: () => void;
}

export function Header({ isAuth, logout }: Props) {
	const isLinkActive = ({ isActive }: { isActive: boolean }) =>
		classNames(s.link, {
			[s.active]: isActive
		});

	const onExit = () => {
		logout();
	};

	return (
		<header className={s.header}>
			<div className="container">
				<div className={s.headerInner}>
					<nav className={s.menu}>
						<NavLink className={classNames(s.logo)} to="/">
							<Logo />
						</NavLink>
						<ul className={s.menuList}>
							{isAuth ? (
								<>
									<li className={s.menuItem}>
										<NavLink
											className={isLinkActive}
											to="/history"
										>
											History
										</NavLink>
									</li>
									<li className={s.menuItem}>
										<NavLink
											className={isLinkActive}
											to="/favourite"
										>
											Favourite
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li className={s.menuItem}>
										<NavLink
											className={isLinkActive}
											to="/signup"
										>
											Registration
										</NavLink>
									</li>
									<li className={s.menuItem}>
										<NavLink
											className={isLinkActive}
											to="/signin"
										>
											Login
										</NavLink>
									</li>
								</>
							)}
						</ul>
						{isAuth && (
							<Button buttonType="icon" onClick={onExit}>
								<ExitIcon />
							</Button>
						)}
					</nav>
					<Search />
				</div>
			</div>
		</header>
	);
}
