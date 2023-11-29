import React from 'react';
import classNames from 'classnames';

import { useAuth, useFavourite } from '../../hooks';
import { Comics } from '../../models/comics';

import { Button, Loader } from '../../components';
import { HeartIcon } from '../icons/heart-icon';

import s from './favourite-button.module.css';

interface Props {
	comics: Comics;
}

export function FavouriteButton({ comics }: Props) {
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
		<Button
			className={classNames(s.favourite, {
				[s.active]: isComicsFavourite,
				[s.visible]: isAuth
			})}
			buttonType="icon"
			disabled={isDisabled}
			onClick={onFavouriteClick}
		>
			{isDisabled ? (
				<Loader className={s.loader} />
			) : (
				<HeartIcon className={s.icon} />
			)}
		</Button>
	);
}
