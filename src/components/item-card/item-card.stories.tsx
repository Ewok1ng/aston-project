import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';

import { store } from '../../store/store';
import { useAuth } from '../../hooks';

import { ItemCard } from './item-card';

import '../../index.css';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof ItemCard> = {
	title: 'Components/ItemCard',
	component: ItemCard,
	decorators: [
		withRouter,
		Story => (
			<Provider store={store}>
				<Story />
			</Provider>
		)
	],
	args: {
		comics: {
			id: 1223,
			title: 'ELEKTRA VOL. 3: RELENTLESS TPB (Trade Paperback)',
			description:
				"Collects Elektra (2001) #23-28.  Experience the life of Elektra, the stunning killer-for-hire, from two unique perspectives - through the eyes of the assassin herself, and through the eyes of her latest mark, completing a unique journey ending on a dying man's last day - if Elektra has her way, that is!",
			pageCount: 0,
			onSaleDate: new Date('2004-03-01T00:00:00-0500'),
			printPrice: 0,
			thumbnail: {
				path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/d0/4bb7b9ec9a73f',
				extension: 'jpg'
			},
			creators: []
		}
	},
	render: args => {
		const { login, auth } = useAuth();

		React.useEffect(() => {
			login('test1@gmail.com', 'qwerty12345');
			auth();
		}, []);

		return <ItemCard {...args} />;
	}
};

export const Default: Story = {
	args: {
		isFavourite: false
	}
};

export const Favourite: Story = {
	args: {
		isFavourite: true
	}
};

export default meta;
