import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ComicsResponseType } from '../../types/comics-response';

const URL = `${process.env.REACT_APP_MARVEL_API_URL}/comics`;
const queryParams = {
	apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
	ts: 1,
	hash: process.env.REACT_APP_MARVEL_MD5,
	format: 'comic'
};

export const fetchAllComics = createAsyncThunk(
	'comics/fetchAllComics',
	async (_, thunkAPI) => {
		try {
			const comicsList = await axios
				.get<ComicsResponseType>(URL, {
					params: queryParams
				})
				.then(res => res.data.data.results);

			// TODO normalize state
			return comicsList;
		} catch (e) {
			return thunkAPI.rejectWithValue((e as Error).message);
		}
	}
);

export const fetchComicsById = createAsyncThunk(
	'comics/fetchComicsById',
	async (comicsId: string, thunkAPI) => {
		const id = parseInt(comicsId);

		try {
			const comics = await axios
				.get<ComicsResponseType>(URL, {
					params: {
						...queryParams,
						id
					}
				})
				.then(res => res.data.data.results);

			// TODO normalize state
			return comics[0];
		} catch (e) {
			return thunkAPI.rejectWithValue((e as Error).message);
		}
	}
);
