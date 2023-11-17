import { LsUser } from '../models/user';

export function getLsData(authUser: string | null) {
	if (authUser) {
		const userDataString = localStorage.getItem(authUser);

		if (userDataString) {
			const userData: LsUser = JSON.parse(userDataString);

			return userData;
		}
	}

	return null;
}

export function setLsData(authUser: string | null, newUserData: LsUser) {
	if (authUser) {
		localStorage.setItem(authUser, JSON.stringify(newUserData));
	}
}
