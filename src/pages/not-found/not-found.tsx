import React from 'react';

import { Link } from 'react-router-dom';

import s from './not-found.module.css';

function NotFound() {
	return (
		<div className={s.container}>
			<h1 className={s.title}>404</h1>
			<p className={s.text}>Page not found</p>
			<Link to="/">Back to Home page</Link>
		</div>
	);
}

export default NotFound;
