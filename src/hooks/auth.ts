import { auth } from '../firebase';
import {
	removeUser,
	setUser,
	setIsLoading
} from '../store/reducers/user-slice';
import { userSelector } from '../store/selectors';
import { fbRegister, fbLogin } from '../services/firebase-auth';
import { logoutlsUser, lsLogin, lsRegistration } from '../services/ls-auth';

import { useAppDispatch, useAppSelector } from './redux';

export function useAuth() {
	const user = useAppSelector(userSelector.user);
	const dispatch = useAppDispatch();

	const authUser = () => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase': {
				return auth.onAuthStateChanged(async user => {
					if (user) {
						dispatch(setUser(user));
					}
					dispatch(setIsLoading(false));
				});
			}
			case 'ls':
				{
					const authEmail = localStorage.getItem('auth');

					if (authEmail) {
						const user = localStorage.getItem(authEmail);

						if (user) {
							dispatch(setUser(JSON.parse(user)));
						}
						dispatch(setIsLoading(false));
					}
				}
				return;
			default:
				return;
		}
	};

	const loginUser = (email: string, password: string) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				return fbLogin(email, password);
			case 'ls':
				return lsLogin(email, password);
			default:
				return;
		}
	};

	const registerUser = (email: string, password: string) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				return fbRegister(email, password);
			case 'ls':
				return lsRegistration(email, password);
			default:
				return;
		}
	};

	const userLogout = () => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				auth.signOut();
				dispatch(removeUser());
				break;
			case 'ls':
				logoutlsUser();
				dispatch(removeUser());
				break;
			default:
				return;
		}
	};

	return {
		isAuth: !!user,
		user: user,
		auth: authUser,
		login: loginUser,
		register: registerUser,
		logout: userLogout
	};
}
