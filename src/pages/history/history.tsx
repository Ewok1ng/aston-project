import React from 'react';
import classNames from 'classnames';

import {
	useFetchAllHistoryQuery,
	useRemoveFromHistoryMutation
} from '../../store/api/history-api';
import { ItemHistory, Loader } from '../../components';
import { useAuth } from '../../hooks';

import { HistoryItem } from '../../models/history';

import s from './history.module.css';

function History() {
	const { user } = useAuth();
	const {
		data: historyList = [],
		isLoading,
		isFetching
	} = useFetchAllHistoryQuery(user?.email);
	const [removeHistory] = useRemoveFromHistoryMutation();

	const removeHistoryItem = (historyItem: HistoryItem) => {
		removeHistory({ email: user?.email, historyItem });
	};

	if (isLoading || isFetching) {
		return <Loader />;
	}

	return (
		<>
			<h2>History</h2>
			{historyList.length > 0 ? (
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
							historyItem={item}
							removeHistoryItem={removeHistoryItem}
						/>
					))}
				</div>
			) : (
				<span>There is nothing</span>
			)}
		</>
	);
}

export default History;
