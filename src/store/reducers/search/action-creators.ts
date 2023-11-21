import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ComicsResponseType } from '../../../types/comics-response';
import { COMICS_QUERY_PARAMS, COMICS_URL } from '../../../utils/comics-api';

export const fetchComicsByTitle = createAsyncThunk(
	'search/fetchComicsByTitle',
	async (comicsTitle: string, thunkAPI) => {
		try {
			return await axios
				.get<ComicsResponseType>(COMICS_URL, {
					params: {
						...COMICS_QUERY_PARAMS,
						titleStartsWith: comicsTitle
					}
				})
				.then(res => res.data.data.results);

			// TODO normalize state
		} catch (e) {
			return thunkAPI.rejectWithValue((e as Error).message);
		}
	}
);

export const fetchSuggestComicsByTitle = createAsyncThunk(
	'search/fetchSuggestComicsByTitle',
	async (comicsTitle: string, thunkAPI) => {
		try {
			return await axios
				.get<ComicsResponseType>(COMICS_URL, {
					params: {
						...COMICS_QUERY_PARAMS,
						titleStartsWith: comicsTitle
					}
				})
				.then(res => res.data.data.results);

			// TODO normalize state
		} catch (e) {
			return thunkAPI.rejectWithValue((e as Error).message);
		}
	}
);
