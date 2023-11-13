import React from 'react';

import classNames from 'classnames';

import s from './button.module.css';
import { Props } from './button.props';

export function Button({ className, onClick, children }: Props) {
	return (
		<button className={classNames(s.button, className)} onClick={onClick}>
			{children}
		</button>
	);
}
