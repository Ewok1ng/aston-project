import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Provider } from 'react-redux';

import { store } from '../../store/store';
import '../../index.css';

import { Header } from './header';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
	title: 'Components/Header',
	component: Header,
	decorators: [
		withRouter,
		Story => (
			<Provider store={store}>
				<Story />
			</Provider>
		)
	]
};

type Story = StoryObj<typeof meta>;

export const Login: Story = {
	args: {
		isAuth: true
	}
};

export const Logout: Story = {
	args: {
		isAuth: false
	}
};

export default meta;
