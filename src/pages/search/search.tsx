import React from 'react';

import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { ItemCard } from '../../components';
import { FormatEnum, getImage } from '../../utils/images';
import { Comics } from '../../types/comics-response';
import { fetchComicsByTitle } from '../../store/reducers/search/action-creators';

import {
	addFavourite,
	removeFavourite
} from '../../store/reducers/favourite/action-creators';

import s from './search.module.css';

export function Search() {
	const { isAuth } = useAuth();
	const dispatch = useAppDispatch();
	const { comicsList } = useAppSelector(state => state.searchReducer);
	const { favouriteList } = useAppSelector(state => state.favouriteReducer);

	const [searchParams] = useSearchParams();
	const searchName = searchParams.get('name');

	React.useEffect(() => {
		if (searchName) {
			dispatch(fetchComicsByTitle(searchName));
		}
	}, []);

	const isFavourite = (id: number) => {
		return favouriteList.find(item => item.id === id) ? true : false;
	};

	const addComicsToFavourite = (comics: Comics) => {
		dispatch(addFavourite(comics));
	};

	const removeComicsFromFavourite = (comics: Comics) => {
		dispatch(removeFavourite(comics));
	};

	return (
		<>
			<h2>Search results for: {`"${searchName}"`}</h2>
			<ul className={s.items}>
				{comicsList.map(item => (
					<ItemCard
						key={item.id}
						itemId={item.id}
						title={item.title}
						imageSrc={getImage(item, FormatEnum.portrait)}
						isAuth={isAuth}
						isFavourite={isFavourite(item.id)}
						addToFavourite={() => addComicsToFavourite(item)}
						removeFromFavourite={() =>
							removeComicsFromFavourite(item)
						}
					/>
				))}
			</ul>
		</>
	);
}
