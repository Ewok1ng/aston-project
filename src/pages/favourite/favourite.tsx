import React from 'react';

import { useFetchAllFavouriteQuery } from '../../store/api/favourite-api';
import { ItemCard } from '../../components';

import s from './favourite.module.css';

export function Favourite() {
	const { data: favouriteList = [], isLoading } = useFetchAllFavouriteQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h2>Favourite comics</h2>
			<ul className={s.items}>
				{favouriteList.map(item => (
					<ItemCard key={item.id} comics={item} isFavourite={true} />
				))}
			</ul>
		</>
	);
}
