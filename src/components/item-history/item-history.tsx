import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../button/button';
import { formatTimestamp } from '../../utils/formatDate';

import { ClearIcon } from './clear-icon';
import s from './item-history.module.css';

interface Props {
	rowClassName: string;
	colClassName: string;
	timestamp: string;
	name: string;
	removeHistoryItem: (timestamp: string) => void;
}

export function ItemHistory({
	rowClassName,
	colClassName,
	timestamp,
	name,
	removeHistoryItem
}: Props) {
	return (
		<div className={rowClassName}>
			<span className={colClassName}>
				<Button
					className={s.button}
					buttonType="icon"
					onClick={() => removeHistoryItem(timestamp)}
				>
					<ClearIcon />
				</Button>
			</span>
			<Link to={`/search?name=${name}`} className={colClassName}>
				{formatTimestamp(timestamp)}
			</Link>
			<Link to={`/search?name=${name}`} className={colClassName}>
				{name}
			</Link>
		</div>
	);
}
