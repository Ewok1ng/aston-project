import { User } from 'firebase/auth';

import { Comics } from '../types/comics-response';

import { HistoryItem } from './history';

export interface FsUser extends User {}
export interface LsUser {
	email: string;
	password: string;
	favouriteList: Comics[];
	historyList: HistoryItem[];
}
