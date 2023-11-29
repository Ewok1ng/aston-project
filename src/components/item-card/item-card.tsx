import React from 'react';
import { Link } from 'react-router-dom';

import { FormatEnum, getImage } from '../../utils/images';
import { useAuth, useFavourite } from '../../hooks';
import { Comics } from '../../models/comics';

import { FavouriteButton } from '../favourite-button/favourite-button';

import s from './item-card.module.css';

interface Props {
	comics: Comics;
}

export function ItemCard({ comics }: Props) {
	const { isAuth } = useAuth();
	const { isFavourite, addToFavourite, removeFromFavourite, isDisabled } =
		useFavourite();

	const [isComicsFavourite, setIsComicsFavourite] = React.useState(
		isFavourite(Number(comics.id))
	);

	const onFavouriteClick = () => {
		if (!isComicsFavourite) {
			addToFavourite(comics);
		} else {
			removeFromFavourite(comics);
		}
		setIsComicsFavourite(prevState => !prevState);
	};

	return (
		<li className={s.card} title={comics.title}>
			<div className={s.content}>
				<Link
					className={s.cardLink}
					replace
					to={`/comics/${comics.id}`}
				>
					<div className={s.imageContainer}>
						<img
							className={s.image}
							src={getImage(comics, FormatEnum.portrait)}
							alt={comics.title}
						/>
					</div>
				</Link>
				<div className={s.info}>
					<h3 className={s.title}>{comics.title}</h3>
					<FavouriteButton
						isAuth={isAuth}
						isComicsFavourite={isComicsFavourite}
						isDisabled={isDisabled}
						onFavouriteClick={onFavouriteClick}
					/>
				</div>
			</div>
		</li>
	);
}
