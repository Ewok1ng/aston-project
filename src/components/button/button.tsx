import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

import s from './button.module.css';

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	buttonType: 'text' | 'icon';
}

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
