import { User } from 'firebase/auth';

import { HistoryItem } from './history';
import { Comics } from './comics';

export interface FsUser extends User {}
export interface LsUser {
	email: string;
	password: string;
	favouriteList: Comics[];
	historyList: HistoryItem[];
}
