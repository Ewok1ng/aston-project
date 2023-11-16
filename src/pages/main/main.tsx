import React from 'react';

import { fetchAllComics } from '../../store/reducers/action-creators';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getImage, FormatEnum } from '../../utils/images';
import { ItemCard } from '../../components/item-card/item-card';

import s from './main.module.css';

export function Main() {
	const dispatch = useAppDispatch();

	const { comicsList, isLoading } = useAppSelector(
		state => state.comicsReducer
	);

	React.useEffect(() => {
		dispatch(fetchAllComics());
	}, []);

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
					/>
				))}
			</ul>
		</>
	);
}
