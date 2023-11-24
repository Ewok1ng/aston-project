import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Provider } from 'react-redux';

import { store } from '../../store/store';

import { ItemSuggest } from './item-suggest';

import '../../index.css';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof ItemSuggest> = {
	title: 'Components/ItemSuggest',
	component: ItemSuggest,
	decorators: [
		withRouter,
		Story => (
			<Provider store={store}>
				<div style={{ padding: '30px', background: '#202020' }}>
					<Story />
				</div>
			</Provider>
		)
	],
	args: {
		image: 'http://i.annihil.us/u/prod/marvel/i/mg/d/10/577e6cfba4e76/portrait_uncanny.jpg',
		title: 'New X-Men (2001) #150'
	}
};
export default meta;

export const Default: Story = {
	args: {}
};
