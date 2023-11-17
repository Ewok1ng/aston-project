import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from '../button/button';

import s from './item-card.module.css';
import { HeartIcon } from './heart-icon';

interface Props {
	itemId: number;
	title: string;
	imageSrc: string;
	isAuth: boolean;
	isFavourite: boolean;
	addToFavourite?: () => void;
	removeFromFavourite: () => void;
}

export function ItemCard({
	itemId,
	title,
	imageSrc,
	isAuth,
	isFavourite,
	addToFavourite,
	removeFromFavourite
}: Props) {
	const onFavouriteClick = () => {
		if (!isFavourite) {
			addToFavourite?.();
		} else {
			removeFromFavourite();
		}
	};

	return (
		<li className={s.card} title={title}>
			<div className={s.content}>
				<Link className={s.cardLink} replace to={`/comics/${itemId}`}>
					<div className={s.imageContainer}>
						<img className={s.image} src={imageSrc} alt={title} />
					</div>
				</Link>
				<div className={s.info}>
					<h3 className={s.title}>{title}</h3>
					<Button
						className={classNames(s.favourite, {
							[s.active]: isFavourite,
							[s.visible]: isAuth
						})}
						buttonType="icon"
						onClick={onFavouriteClick}
					>
						<HeartIcon className={s.icon} />
					</Button>
				</div>
			</div>
		</li>
	);
}
