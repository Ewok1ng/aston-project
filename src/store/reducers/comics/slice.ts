import { createSlice } from '@reduxjs/toolkit';

import { Comics } from '../../../types/comics-response';

import { fetchComicsById } from './action-creators';

interface SingleComicsState {
	comics: Comics | null;
	isLoading: boolean;
	error: string;
}

const initialState: SingleComicsState = {
	comics: null,
	isLoading: false,
	error: ''
};

export const singleComicsSlice = createSlice({
	name: 'singleComics',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchComicsById.pending, state => {
				state.isLoading = true;
				state.comics = null;
			})
			.addCase(fetchComicsById.fulfilled, (state, action) => {
				state.comics = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchComicsById.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	}
});

export default singleComicsSlice.reducer;
