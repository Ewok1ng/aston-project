import React from 'react';

import { fetchAllComics } from '../../store/reducers/all-comics/action-creators';
import {
	addFavourite,
	fetchAllFavourite,
	removeFavourite
} from '../../store/reducers/favourite/action-creators';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { getImage, FormatEnum } from '../../utils/images';
import { Comics } from '../../types/comics-response';

import { ItemCard } from '../../components/item-card/item-card';

import s from './main.module.css';

export function Main() {
	const dispatch = useAppDispatch();

	const { comicsList, isLoading } = useAppSelector(
		state => state.allComicsReducer
	);
	const { isAuth } = useAuth();
	const { favouriteList } = useAppSelector(state => state.favouriteReducer);

	const isFavourite = (id: number) => {
		return favouriteList.find(item => item.id === id) ? true : false;
	};

	React.useEffect(() => {
		dispatch(fetchAllComics());
		dispatch(fetchAllFavourite());
	}, []);

	const addComicsToFavourite = (comics: Comics) => {
		dispatch(addFavourite(comics));
	};

	const removeComicsFromFavourite = (comics: Comics) => {
		dispatch(removeFavourite(comics));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h2>Marvel comics</h2>
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
