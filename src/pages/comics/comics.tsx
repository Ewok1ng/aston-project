import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetchComicsByIdQuery } from '../../store/api/comics-api';
import { formateDate } from '../../utils/format-date';
import { Loader } from '../../components';

import s from './comics.module.css';

function Comics() {
	const { comicsId } = useParams();

	const { data, isLoading } = useFetchComicsByIdQuery(comicsId || '');

	if (isLoading || !data) {
		return <Loader />;
	}

	const saleDate = data.onSaleDate ? formateDate(data.onSaleDate) : '-';

	return (
		<div className={s.container}>
			<div className={s.wrapper}>
				<div className={s.thumbnailContainer}>
					<img
						className={s.thumbnail}
						src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
						alt={data.title}
					/>
				</div>
				<div className={s.info}>
					<h2 className={s.title}>{data.title}</h2>
					<div className={s.data}>
						<strong>On sale: </strong>
						<span>{saleDate}</span>
					</div>
					<div className={s.data}>
						<strong>Page count: </strong>
						<span>{data.pageCount}</span>

						<strong>Price: </strong>
						<span>${data.printPrice || '-'}</span>
					</div>
					<div className={s.data}>
						<strong>Creators: </strong>
						<ul>
							{data.creators.map((creator, index) => (
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
							{data.description || '-'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Comics;
