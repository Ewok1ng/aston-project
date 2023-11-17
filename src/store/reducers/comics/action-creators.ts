import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ComicsResponseType } from '../../../types/comics-response';
import { COMICS_URL, COMICS_QUERY_PARAMS } from '../../../utils/comics-api';

export const fetchComicsById = createAsyncThunk(
	'comics/fetchComicsById',
	async (comicsId: string, thunkAPI) => {
		const id = parseInt(comicsId);

		try {
			return await axios
				.get<ComicsResponseType>(COMICS_URL, {
					params: {
						...COMICS_QUERY_PARAMS,
						id
					}
				})
				.then(res => res.data.data.results[0]);

			// TODO normalize state
		} catch (e) {
			return thunkAPI.rejectWithValue((e as Error).message);
		}
	}
);
