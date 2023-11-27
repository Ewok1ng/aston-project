import toast from 'react-hot-toast';

import { LsUser } from '../models/user';

export function lsRegistration(email: string, password: string): LsUser | null {
	const user = {
		email,
		password,
		favouriteList: [],
		historyList: []
	};

	const existingUser = localStorage.getItem(email);

	if (existingUser) {
		toast.error('LocalStorage: Error (auth/email-already-in-use).');
		return null;
	}

	localStorage.setItem(email, JSON.stringify(user));
	authLsUser(email);

	return user;
}

export function lsLogin(email: string, password: string): LsUser | null {
	const existingUser = localStorage.getItem(email);

	if (existingUser) {
		const user = JSON.parse(existingUser);

		if (user.password === password) {
			authLsUser(email);
			return user;
		}
	}

	toast.error('LocalStorage: Error (auth/invalid-credentials).');
	return null;
}

export function authLsUser(userEmail: string) {
	localStorage.setItem('auth', userEmail);
}

export function logoutlsUser() {
	localStorage.removeItem('auth');
}

export function getAuthUser() {
	return localStorage.getItem('auth');
}
