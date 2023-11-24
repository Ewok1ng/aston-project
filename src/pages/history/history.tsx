import React from 'react';
import classNames from 'classnames';

import {
	useFetchAllHistoryQuery,
	useRemoveFromHistoryMutation
} from '../../store/api/history-api';
import { ItemHistory, Loader } from '../../components';

import s from './history.module.css';

function History() {
	const {
		data: historyList = [],
		isLoading,
		isFetching
	} = useFetchAllHistoryQuery();
	const [removeHistory] = useRemoveFromHistoryMutation();

	const removeHistoryItem = (timestamp: string) => {
		removeHistory(timestamp);
	};

	if (isLoading || isFetching) {
		return <Loader />;
	}

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

export default History;
