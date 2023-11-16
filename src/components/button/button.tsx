import React from 'react';

import classNames from 'classnames';

import s from './button.module.css';
import { Props } from './button.props';

export function Button({ className, buttonType, children, ...props }: Props) {
	return (
		<button
			className={classNames(
				s.button,
				{
					[s.textButton]: buttonType === 'text',
					[s.iconButton]: buttonType === 'icon'
				},
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
