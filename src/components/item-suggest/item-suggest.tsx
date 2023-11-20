import React from 'react';

import { Link } from 'react-router-dom';

import classNames from 'classnames';

import s from './item-suggest.module.css';

interface Props {
	className: string;
	id: number;
	title: string;
	image: string;
	onClick: () => void;
}

export function ItemSuggest({ className, id, title, image, onClick }: Props) {
	return (
		<li key={id} className={classNames(s.item, className)}>
			<Link className={s.link} to={`/comics/${id}`} onClick={onClick}>
				<img
					className={s.image}
					width={50}
					height={50}
					src={image}
					alt={title}
				/>
				<h4 className={s.title}>{title}</h4>
			</Link>
		</li>
	);
}
