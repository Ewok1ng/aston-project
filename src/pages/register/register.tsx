import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUser } from '../../store/reducers/user-slice';
import { useAppDispatch, useAuth } from '../../hooks';

import { Form } from '../../components';

import s from './register.module.css';

export function Register() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuth, register } = useAuth();

	React.useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	}, [isAuth]);

	const onSubmitForm = async (email: string, password: string) => {
		const user = await register(email, password);

		if (user) {
			dispatch(setUser(user));
		}
	};

	// TODO Loader

	return (
		<div className={s.register}>
			<h2>Registration</h2>
			<Form text="Register" onSubmitForm={onSubmitForm} />
			<Link to="/login">Sign up</Link>
		</div>
	);
}
