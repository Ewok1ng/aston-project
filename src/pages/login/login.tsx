import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUser } from '../../store/reducers/user-slice';
import { useAppDispatch, useAuth } from '../../hooks';

import { Form } from '../../components';

import s from './login.module.css';

function Login() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuth, login } = useAuth();

	React.useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	}, [isAuth]);

	const onSubmitForm = async (email: string, password: string) => {
		const user = await login(email, password);

		if (user) {
			dispatch(setUser(user));
		}
	};

	// TODO Loader

	return (
		<div className={s.login}>
			<h2 className={s.title}>Login</h2>
			<Form text="Login" onSubmitForm={onSubmitForm} />

			<Link to="/register">Registration</Link>
		</div>
	);
}

export default Login;
