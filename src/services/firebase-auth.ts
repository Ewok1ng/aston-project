import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import toast from 'react-hot-toast';

import { auth, db } from '../firebase';

export function fbRegister(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(credentials => credentials.user)
		.then(user => {
			setDoc(doc(db, 'users', email), {
				favourite: [],
				history: []
			});
			return user;
		})
		.catch(error => {
			toast.error(error.message);
		});
}

export function fbLogin(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password)
		.then(credentials => credentials.user)
		.catch(error => {
			toast.error(error.message);
		});
}
