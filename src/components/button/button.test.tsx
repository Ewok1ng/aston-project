import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { ClearIcon } from '../icons/clear-icon';

import { Button } from './button';

describe('Button component', () => {
	test('text button renders', () => {
		const { getByText } = render(<Button buttonType="text">Click</Button>);
		const button = getByText('Click');

		expect(button).toBeInTheDocument();
	});

	test('icon button renders', () => {
		const { getByRole } = render(
			<Button buttonType="icon">
				<ClearIcon />
			</Button>
		);
		const button = getByRole('button');

		expect(button).toBeInTheDocument();
	});

	test('invokes onClick when clicked', () => {
		const onClickMock = jest.fn();
		const { getByText } = render(
			<Button buttonType="text" onClick={onClickMock}>
				Click
			</Button>
		);
		const button = getByText('Click');

		fireEvent.click(button);
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
});
