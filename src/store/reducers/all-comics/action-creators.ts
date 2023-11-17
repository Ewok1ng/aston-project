import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ComicsResponseType } from '../../../types/comics-response';
import { COMICS_URL, COMICS_QUERY_PARAMS } from '../../../utils/comics-api';

export const fetchAllComics = createAsyncThunk(
	'comics/fetchAllComics',
	async (_, thunkAPI) => {
		try {
			return await axios
				.get<ComicsResponseType>(COMICS_URL, {
					params: COMICS_QUERY_PARAMS
				})
				.then(res => res.data.data.results);

			// TODO normalize state
		} catch (e) {
			return thunkAPI.rejectWithValue((e as Error).message);
		}
	}
);
