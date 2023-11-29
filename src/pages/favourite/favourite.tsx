import React from 'react';

import { useFetchAllFavouriteQuery } from '../../store/api/favourite-api';
import { useAuth } from '../../hooks';
import { ItemCard, Loader } from '../../components';

import s from './favourite.module.css';

function Favourite() {
	const { user } = useAuth();
	const { data: favouriteList = [], isLoading } = useFetchAllFavouriteQuery(
		user?.email
	);

	if (isLoading) {
		return <Loader />;
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
						<ItemCard key={item.id} comics={item} />
					))}
				</ul>
			)}
		</>
	);
}

export default Favourite;
