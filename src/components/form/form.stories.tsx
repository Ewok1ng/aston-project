import { Form } from './form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Form> = {
	title: 'Components/Form',
	component: Form
};

type Story = StoryObj<typeof meta>;

export const Text: Story = {
	args: {
		text: 'Submit'
	}
};

export default meta;
