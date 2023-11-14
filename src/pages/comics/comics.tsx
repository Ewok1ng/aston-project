import React from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchComicsById } from '../../store/reducers/action-creators';

import s from './comics.module.css';

export function Comics() {
	let content;
	const { comicsId } = useParams();
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(fetchComicsById(comicsId || ''));
	}, []);

	const { comics, isLoading, error } = useAppSelector(
		state => state.singleComicsReducer
	);

	if (isLoading) {
		content = <div className={s.continer}>Loading...</div>;
	}

	if (error) {
		content = <div className={s.container}>Error...</div>;
	}

	if (comics && !isLoading) {
		content = (
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.thumbnailContainer}>
						<img
							className={s.thumbnail}
							src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
							alt={comics.title}
						/>
					</div>
					<div className={s.info}>
						<h2 className={s.title}>{comics.title}</h2>
						<div className={s.publish}>
							{/* TODO */}
							<strong>On sale: </strong>
							{'May 08, 2019'}
						</div>
						<p className={s.dsecription}>
							{/* TODO */}
							{comics.description?.split('<br>').join(' ')}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return <div>{content}</div>;
}