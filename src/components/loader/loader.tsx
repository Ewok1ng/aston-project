import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { SpinnerIcon } from '../icons/spinner-icon';

import s from './loader.module.css';

interface Props {
	className?: string;
}

export function Loader({ className }: Props) {
	return (
		<div className={classNames(s.loader, className)}>
			<SpinnerIcon className={s.spinner} />
		</div>
	);
}

Loader.propTypes = {
	classNames: PropTypes.string
};
