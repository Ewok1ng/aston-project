import React from 'react';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { validationSchema } from '../../utils/validation-schema';

import { Button } from '../../components';

import s from './form.module.css';

interface AuthFormValues {
	email: string;
	password: string;
}

interface Props {
	text: string;
	onSubmitForm: (email: string, password: string) => void;
}

export function Form({ text, onSubmitForm }: Props) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm<AuthFormValues>({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit: SubmitHandler<AuthFormValues> = data => {
		onSubmitForm(data.email, data.password);
		reset();
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.inputContainer}>
				<label className={s.label} htmlFor="email">
					Enter your email
				</label>
				<input
					className={classNames(s.input)}
					id="email"
					{...register('email')}
				/>
				<span className={s.error}>{errors.email?.message}</span>
			</div>
			<div className={s.inputContainer}>
				<label className={s.label} htmlFor="password">
					Enter your password
				</label>
				<input
					className={classNames(s.input)}
					id="password"
					type="password"
					{...register('password')}
				/>
				<span className={s.error}>{errors.password?.message}</span>
			</div>
			<Button type="submit" className={s.button} buttonType="text">
				{text}
			</Button>
		</form>
	);
}

Form.propTypes = {
	text: PropTypes.string.isRequired,
	onSubmitForm: PropTypes.func.isRequired
};
