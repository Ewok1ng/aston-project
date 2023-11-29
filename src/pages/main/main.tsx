import React from 'react';

import { useFetchAllComicsQuery } from '../../store/api/comics-api';
import { Loader, ItemCard } from '../../components';
import { Comics } from '../../models/comics';

import s from './main.module.css';

function Main() {
	const {
		data: comicsList = [],
		isLoading,
		isFetching
	} = useFetchAllComicsQuery();

	if (isLoading || isFetching) {
		return <Loader />;
	}

	return (
		<>
			<h2>Marvel comics</h2>
			<ul className={s.items}>
				{comicsList.map((item: Comics) => (
					<ItemCard key={item.id} comics={item} />
				))}
			</ul>
		</>
	);
}

export default Main;
