import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Search, Logo, Button } from '../../components';

import s from './header.module.css';

export function Header() {
	const isLinkActive = ({ isActive }: { isActive: boolean }) =>
		classNames(s.link, {
			[s.active]: isActive
		});

	const onExit = () => {
		//TODO
	};

	return (
		<div className={s.header}>
			<div className="container">
				<div className={s.headerInner}>
					<nav className={s.menu}>
						<NavLink className={classNames(s.logo)} to="/">
							<Logo />
						</NavLink>
						<ul className={s.menuList}>
							<li className={s.menuItem}>
								<NavLink className={isLinkActive} to="/history">
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
						</ul>
						<Button onClick={onExit}>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636"
									stroke="#fff"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5"
									stroke="#fff"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Button>
					</nav>
					<Search />
				</div>
			</div>
		</div>
	);
}
