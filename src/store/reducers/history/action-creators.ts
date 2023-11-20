import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	setDoc
} from 'firebase/firestore';

import { db } from '../../../firebase';
import { HistoryItem } from '../../../models/history';
import { getAuthUser } from '../../../services/ls-auth';
import { getLsData, setLsData } from '../../../services/ls-data';

export const addHistory = createAsyncThunk(
	'history/addToHistory',
	async (name: string, thunkAPI) => {
		const date = new Date().toJSON();
		const history = {
			timestamp: date,
			name
		};

		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				try {
					const historyDocRef = doc(db, 'history', date);

					await setDoc(historyDocRef, history);

					return history;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			case 'ls':
				try {
					const authUser = getAuthUser();
					const userData = getLsData(authUser);

					if (userData) {
						userData.historyList.push(history);
						setLsData(authUser, userData);
					}

					return history;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			default:
				return;
		}
	}
);

export const removeHistory = createAsyncThunk(
	'history/removeFromHistory',
	async (timestamp: string, thunkAPI) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				try {
					await deleteDoc(doc(db, 'history', timestamp));

					return timestamp;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			case 'ls':
				try {
					const authUser = getAuthUser();
					const userData = getLsData(authUser);

					if (userData) {
						userData.historyList = userData.historyList.filter(
							item => item.timestamp !== timestamp
						);
						setLsData(authUser, userData);
					}

					return timestamp;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			default:
				return;
		}
	}
);

export const fetchAllHistory = createAsyncThunk(
	'history/fetchAllHistory',
	async (_, thunkAPI) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				try {
					const historyCol = collection(db, 'history');
					const historySnapshot = await getDocs(historyCol);
					const historyList = historySnapshot.docs.map(
						doc => doc.data() as HistoryItem
					);

					return historyList;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			case 'ls':
				try {
					const authUser = getAuthUser();
					const userData = getLsData(authUser);

					if (userData) {
						return userData.historyList;
					}

					return [];
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			default:
				return;
		}
	}
);
