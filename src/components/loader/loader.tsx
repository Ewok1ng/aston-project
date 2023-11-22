import React from 'react';
import classNames from 'classnames';

import { SpinnerIcon } from './spinner-icon';

import s from './loader.module.css';

interface Props {
	className?: string;
}

export function Loader({ className }: Props) {
	return (
		<div className={s.loader}>
			<SpinnerIcon className={classNames(s.spinner, className)} />
		</div>
	);
}
