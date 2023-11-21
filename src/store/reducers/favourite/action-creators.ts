import { deleteDoc, doc, getDocs, setDoc } from '@firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Comics } from '../../../types/comics-response';
import { getAuthUser } from '../../../services/ls-auth';
import { getLsData, setLsData } from '../../../services/ls-data';
import { favouriteCollection } from '../../../firebase';

export const addFavourite = createAsyncThunk(
	'favourite/addToFavourite',
	async (comics: Comics, thunkAPI) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				try {
					const favouriteRef = doc(
						favouriteCollection,
						comics.id.toString()
					);

					await setDoc(favouriteRef, comics);

					return comics;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			case 'ls':
				try {
					const authUser = getAuthUser();
					const userData = getLsData(authUser);

					if (userData) {
						userData.favouriteList.push(comics);
						setLsData(authUser, userData);
					}

					return comics;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			default:
				return;
		}
	}
);

export const removeFavourite = createAsyncThunk(
	'favourite/removeFromFavourite',
	async (comics: Comics, thunkAPI) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				try {
					const favouriteRef = doc(
						favouriteCollection,
						comics.id.toString()
					);
					await deleteDoc(favouriteRef);

					return comics;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			case 'ls':
				try {
					const authUser = getAuthUser();
					const userData = getLsData(authUser);

					if (userData) {
						userData.favouriteList = userData.favouriteList.filter(
							item => item.id !== comics.id
						);
						setLsData(authUser, userData);
					}

					return comics;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			default:
				return;
		}
	}
);

export const fetchAllFavourite = createAsyncThunk(
	'favourite/fetchAllFavoutrite',
	async (_, thunkAPI) => {
		switch (process.env.REACT_APP_REMOTE_STORE) {
			case 'firebase':
				try {
					const favSnapshot = await getDocs(favouriteCollection);
					const favList = favSnapshot.docs.map(doc => doc.data());

					return favList;
				} catch (e) {
					return thunkAPI.rejectWithValue((e as Error).message);
				}
			case 'ls':
				try {
					const authUser = getAuthUser();
					const userData = getLsData(authUser);

					if (userData) {
						return userData.favouriteList;
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
