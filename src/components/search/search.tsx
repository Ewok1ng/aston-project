import React from 'react';

import { Button } from '../../components';

import { Props } from './search.props';
import s from './search.module.css';

export function Search({ onChange }: Props) {
	const onSearch = () => {
		//TODO
	};

	return (
		<div className={s.inputContainer}>
			<input className={s.input} type="search" onChange={onChange} />
			<Button className={s.button} buttonType="icon" onClick={onSearch}>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
						stroke="#fff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Button>
		</div>
	);
}
