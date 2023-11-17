import { createSlice } from '@reduxjs/toolkit';

import { Comics } from '../../../types/comics-response';

import { fetchAllComics } from './action-creators';

interface ComicsState {
	comicsList: Comics[];
	isLoading: boolean;
	error: string;
}

const initialState: ComicsState = {
	comicsList: [],
	isLoading: false,
	error: ''
};

export const allComicsSlice = createSlice({
	name: 'allComics',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAllComics.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchAllComics.fulfilled, (state, action) => {
				state.comicsList = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchAllComics.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	}
});

export default allComicsSlice.reducer;
