import React from 'react';
import classNames from 'classnames';

import { Button, Loader } from '../../components';

import { HeartIcon } from '../icons/heart-icon';

import s from './favourite-button.module.css';

interface Props {
	isComicsFavourite: boolean;
	isAuth: boolean;
	isDisabled: boolean;
	onFavouriteClick: () => void;
}

export function FavouriteButton({
	isComicsFavourite,
	isAuth,
	isDisabled,
	onFavouriteClick
}: Props) {
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
