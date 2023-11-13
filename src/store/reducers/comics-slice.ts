import { createSlice } from '@reduxjs/toolkit';

import { Comics } from '../../types/comics-response';

import { fetchAllComics } from './action-creators';

interface ComicsState {
	comicsList: Comics[];
	isComicsLoading: boolean;
	isLoading: boolean;
	error: string;
}

const initialState: ComicsState = {
	comicsList: [],
	isComicsLoading: false,
	isLoading: false,
	error: ''
};

export const comicsSlice = createSlice({
	name: 'comics',
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

export default comicsSlice.reducer;
