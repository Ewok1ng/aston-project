import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../firebase';

export function fbRegister(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(credentials => credentials.user)
		.catch(error => {
			console.error(error.message);
		});
}

export function fbLogin(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password)
		.then(credentials => credentials.user)
		.catch(error => {
			console.error(error.message);
		});
}
