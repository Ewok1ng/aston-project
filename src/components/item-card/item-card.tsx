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
}

export function ItemCard({ itemId, title, imageSrc }: Props) {
	const [isFavourite, setIsFavourite] = React.useState<boolean>(false);

	const onFavouriteClick = () => {
		setIsFavourite(prev => !prev);
		// TODO
	};
	return (
		<li className={s.card} title={title}>
			<div className={s.content}>
				<Link className={s.cardLink} to={`comics/${itemId}`}>
					<div className={s.imageContainer}>
						<img className={s.image} src={imageSrc} alt={title} />
					</div>
				</Link>
				<div className={s.info}>
					<h3 className={s.title}>{title}</h3>
					<Button
						className={classNames(s.favourite, {
							[s.active]: isFavourite
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
