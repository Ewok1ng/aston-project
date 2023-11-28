import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
			<Link
				className={s.link}
				data-cy="suggest-link"
				to={`/comics/${id}`}
				onClick={onClick}
			>
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

ItemSuggest.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};
