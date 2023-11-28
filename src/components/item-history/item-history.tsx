import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../button/button';
import { formatTimestamp } from '../../utils/format-date';
import { SearchContext } from '../../context/search-context';
import { HistoryItem } from '../../models/history';

import { ClearIcon } from '../icons/clear-icon';

import s from './item-history.module.css';

interface Props {
	rowClassName: string;
	colClassName: string;
	historyItem: HistoryItem;
	removeHistoryItem: (history: HistoryItem) => void;
}

export function ItemHistory({
	rowClassName,
	colClassName,
	historyItem,
	removeHistoryItem
}: Props) {
	const { setSearchValue } = React.useContext(SearchContext);

	const onClickHistoryItem = () => setSearchValue(historyItem.name);
	const onRemoveHistoryItem = () => removeHistoryItem(historyItem);

	const formattedDate = formatTimestamp(historyItem.timestamp);

	return (
		<div className={rowClassName}>
			<span className={colClassName}>
				<Button
					className={s.button}
					buttonType="icon"
					onClick={onRemoveHistoryItem}
				>
					<ClearIcon />
				</Button>
			</span>
			<Link
				onClick={onClickHistoryItem}
				to={`/search?name=${historyItem.name}`}
				className={colClassName}
			>
				{formattedDate}
			</Link>

			<Link
				onClick={onClickHistoryItem}
				to={`/search?name=${historyItem.name}`}
				className={colClassName}
			>
				{historyItem.name}
			</Link>
		</div>
	);
}
