import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetchComicsByIdQuery } from '../../store/api/comics-api';
import { formateDate } from '../../utils/format-date';
import { useAuth, useFavourite } from '../../hooks';
import { Loader, FavouriteButton } from '../../components';

import s from './comics.module.css';

function Comics() {
	const { comicsId } = useParams();
	const { isAuth } = useAuth();
	const { isFavourite, addToFavourite, removeFromFavourite, isDisabled } =
		useFavourite();

	const { data: comics, isLoading } = useFetchComicsByIdQuery(comicsId || '');

	const [isComicsFavourite, setIsComicsFavourite] = React.useState(
		isFavourite(Number(comicsId))
	);

	const onFavouriteClick = () => {
		if (!isComicsFavourite) {
			addToFavourite(comics);
		} else {
			removeFromFavourite(comics);
		}
		setIsComicsFavourite(prevState => !prevState);
	};

	if (isLoading || !comics) {
		return <Loader />;
	}

	const saleDate = comics.onSaleDate ? formateDate(comics.onSaleDate) : '-';

	return (
		<div className={s.container}>
			<div className={s.wrapper}>
				<div className={s.thumbnailContainer}>
					<img
						className={s.thumbnail}
						data-cy="comics-thumnail"
						src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
						alt={comics.title}
					/>
				</div>
				<div className={s.info}>
					<h2 className={s.title}>{comics.title}</h2>
					<FavouriteButton
						isAuth={isAuth}
						isComicsFavourite={isComicsFavourite}
						isDisabled={isDisabled}
						onFavouriteClick={onFavouriteClick}
					/>
					<div className={s.data}>
						<strong>On sale: </strong>
						<span>{saleDate}</span>
					</div>
					<div className={s.data}>
						<strong>Page count: </strong>
						<span>{comics.pageCount}</span>

						<strong>Price: </strong>
						<span>${comics.printPrice || '-'}</span>
					</div>
					<div className={s.data}>
						<strong>Creators: </strong>
						<ul>
							{comics.creators.map((creator, index) => (
								<li key={index} className={s.creatorsList}>
									<span className={s.creatorName}>
										{creator.name}
									</span>
									<span className={s.creatorRole}>
										{creator.role}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div className={s.data}>
						<strong>Description: </strong>
						<p className={s.description}>
							{comics.description || '-'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Comics;
