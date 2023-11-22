import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetchComicsByIdQuery } from '../../store/api/comics-api';

import s from './comics.module.css';

export function Comics() {
	let content;
	const { comicsId } = useParams();
	const { data, isLoading, isError } = useFetchComicsByIdQuery(
		comicsId || ''
	);

	if (isLoading) {
		content = <div className={s.continer}>Loading...</div>;
	}

	if (isError) {
		content = <div className={s.container}>Error...</div>;
	}

	if (data && !isLoading) {
		content = (
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
						<div className={s.publish}>
							{/* TODO */}
							<strong>On sale: </strong>
							{'May 08, 2019'}
						</div>
						<p className={s.dsecription}>
							{/* TODO */}
							{data.description}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return <div>{content}</div>;
}
