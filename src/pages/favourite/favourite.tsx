import React from 'react';

import { useFetchAllFavouriteQuery } from '../../store/api/favourite-api';
import { ItemCard } from '../../components';

import s from './favourite.module.css';

function Favourite() {
	const { data: favouriteList = [], isLoading } = useFetchAllFavouriteQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h2>Favourite comics</h2>
			{favouriteList.length === 0 && !isLoading && (
				<span>There is nothing</span>
			)}
			{favouriteList.length > 0 && (
				<ul className={s.items}>
					{favouriteList.map(item => (
						<ItemCard
							key={item.id}
							comics={item}
							isFavourite={true}
						/>
					))}
				</ul>
			)}
		</>
	);
}

export default Favourite;
