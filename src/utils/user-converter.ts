import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

import { Comics } from '../models/comics';
import { HistoryItem } from '../models/history';

class User {
	favourite: Comics[];
	history: HistoryItem[];

	constructor(favourite: Comics[], history: HistoryItem[]) {
		this.favourite = favourite;
		this.history = history;
	}
}

// Firestore data converter
export const userConverter = {
	toFirestore: (user: User) => {
		return {
			favourite: user.favourite,
			history: user.history
		};
	},
	fromFirestore: (
		snapshot: QueryDocumentSnapshot<User>,
		options: SnapshotOptions
	) => {
		const data = snapshot.data(options);
		return data;
	}
};
