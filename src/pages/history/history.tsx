import React from 'react';

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	fetchAllHistory,
	removeHistory
} from '../../store/reducers/history/action-creators';
import { ItemHistory } from '../../components';

import s from './history.module.css';

export function History() {
	const dispatch = useAppDispatch();
	const { historyList } = useAppSelector(state => state.historyReducer);

	React.useEffect(() => {
		dispatch(fetchAllHistory());
	}, []);

	const removeHistoryItem = (timestamp: string) => {
		dispatch(removeHistory(timestamp));
	};

	return (
		<>
			<h2>History</h2>
			<div className={s.table}>
				<div className={classNames(s.tableRow, s.headRow)}>
					<div className={s.tableCol}></div>
					<div className={s.tableCol}>Date</div>
					<div className={s.tableCol}>Name</div>
				</div>
				{historyList.map(item => (
					<ItemHistory
						rowClassName={s.tableRow}
						colClassName={s.tableCol}
						key={item.timestamp}
						removeHistoryItem={removeHistoryItem}
						{...item}
					/>
				))}
			</div>
		</>
	);
}
