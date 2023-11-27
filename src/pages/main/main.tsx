import React from 'react';

import { useFetchAllComicsQuery } from '../../store/api/comics-api';
import { useFetchAllFavouriteQuery } from '../../store/api/favourite-api';
import { Loader, ItemCard } from '../../components';
import { Comics } from '../../models/comics';

import { useAuth } from '../../hooks';

import s from './main.module.css';

function Main() {
	const {
		data: comicsList = [],
		isLoading,
		isFetching
	} = useFetchAllComicsQuery();
	const { user } = useAuth();
	const { data: favouriteList = [] } = useFetchAllFavouriteQuery(user?.email);

	const isComicsFavourite = (id: number) => {
		return favouriteList.find(item => item.id === id) ? true : false;
	};

	if (isLoading || isFetching) {
		return <Loader />;
	}

	return (
		<>
			<h2>Marvel comics</h2>
			<ul className={s.items}>
				{comicsList.map((item: Comics) => (
					<ItemCard
						key={item.id}
						comics={item}
						isFavourite={isComicsFavourite(item.id)}
					/>
				))}
			</ul>
		</>
	);
}

export default Main;
