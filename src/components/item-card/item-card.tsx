import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { FormatEnum, getImage } from '../../utils/images';
import {
	useAddToFavouriteMutation,
	useRemoveFromFavouriteMutation
} from '../../store/api/favourite-api';
import { useAuth } from '../../hooks';
import { Comics } from '../../models/comics';
import { Button, Loader } from '../../components';

import { HeartIcon } from '../icons/heart-icon';

import s from './item-card.module.css';

interface Props {
	comics: Comics;
	isFavourite: boolean;
}

export function ItemCard({ comics, isFavourite }: Props) {
	const { isAuth, user } = useAuth();
	const [addFavourite, addResult] = useAddToFavouriteMutation();
	const [removeFavourite, removeResult] = useRemoveFromFavouriteMutation();

	const [isComicsFavourite, setIsComicsFavourite] = React.useState(false);

	React.useEffect(() => {
		setIsComicsFavourite(isFavourite);
	}, []);

	const onFavouriteClick = () => {
		if (!isFavourite) {
			addToFavourite();
		} else {
			removeFromFavourite();
		}
		setIsComicsFavourite(prevState => !prevState);
	};

	const addToFavourite = async () => {
		await addFavourite({ email: user?.email, comics });
	};

	const removeFromFavourite = async () => {
		await removeFavourite({ email: user?.email, comics });
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
					<Button
						className={classNames(s.favourite, {
							[s.active]: isComicsFavourite,
							[s.visible]: isAuth
						})}
						buttonType="icon"
						disabled={addResult.isLoading || removeResult.isLoading}
						onClick={onFavouriteClick}
					>
						{addResult.isLoading || removeResult.isLoading ? (
							<Loader className={s.loader} />
						) : (
							<HeartIcon className={s.icon} />
						)}
					</Button>
				</div>
			</div>
		</li>
	);
}
