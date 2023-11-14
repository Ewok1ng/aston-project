import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
export interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	itemId: number;
	title: string;
	imageSrc: string;
}
