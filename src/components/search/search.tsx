import React from 'react';

import { Button } from '../../components';

import s from './search.module.css';
import { SearchIcon } from './search-icon';

interface Props {
	onChange: () => void;
}

export function Search({ onChange }: Props) {
	const onSearch = () => {
		//TODO
	};

	return (
		<div className={s.inputContainer}>
			<input className={s.input} type="search" onChange={onChange} />
			<Button className={s.button} buttonType="icon" onClick={onSearch}>
				<SearchIcon />
			</Button>
		</div>
	);
}
