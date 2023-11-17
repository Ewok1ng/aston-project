import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	fetchAllFavourite,
	removeFavourite
} from '../../store/reducers/favourite/action-creators';
import { FormatEnum, getImage } from '../../utils/images';
import { Comics } from '../../types/comics-response';

import { ItemCard } from '../../components';

import s from './favourite.module.css';

export function Favourite() {
	const dispatch = useAppDispatch();
	const { isLoading, favouriteList } = useAppSelector(
		state => state.favouriteReducer
	);

	React.useEffect(() => {
		getFavourites();
	}, []);

	function getFavourites() {
		dispatch(fetchAllFavourite());
	}

	const removeComicsFromFavourite = (comics: Comics) => {
		dispatch(removeFavourite(comics));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h2>Favourite comics</h2>
			<ul className={s.items}>
				{favouriteList.map(item => (
					<ItemCard
						key={item.id}
						itemId={item.id}
						title={item.title}
						imageSrc={getImage(item, FormatEnum.portrait)}
						isAuth={true}
						isFavourite={true}
						removeFromFavourite={() =>
							removeComicsFromFavourite(item)
						}
					/>
				))}
			</ul>
		</>
	);
}
