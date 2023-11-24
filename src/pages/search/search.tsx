import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFetchComicsByTitleQuery } from '../../store/api/comics-api';
import { useFetchAllFavouriteQuery } from '../../store/api/favourite-api';

import { ItemCard, Loader } from '../../components';

import s from './search.module.css';

function Search() {
	const [searchParams] = useSearchParams();
	const searchName = searchParams.get('name');
	const {
		data: comicsList = [],
		isLoading,
		isFetching
	} = useFetchComicsByTitleQuery(searchName || '');

	const { data: favouriteList = [] } = useFetchAllFavouriteQuery();

	const isComicsFavourite = (id: number) => {
		return favouriteList.find(item => item.id === id) ? true : false;
	};

	if (isLoading || isFetching) {
		return <Loader />;
	}

	return (
		<>
			<h2>Search results for: {`"${searchName}"`}</h2>
			<ul className={s.items}>
				{comicsList.length > 0 ? (
					comicsList.map(item => (
						<ItemCard
							key={item.id}
							comics={item}
							isFavourite={isComicsFavourite(item.id)}
						/>
					))
				) : (
					<span>Nothing foud</span>
				)}
			</ul>
		</>
	);
}

export default Search;
