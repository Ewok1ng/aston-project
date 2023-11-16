import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	buttonType: 'text' | 'icon';
}
