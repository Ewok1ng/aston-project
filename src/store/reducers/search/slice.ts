import { createSlice } from '@reduxjs/toolkit';

import { Comics } from '../../../types/comics-response';

import {
	fetchComicsByTitle,
	fetchSuggestComicsByTitle
} from './action-creators';

interface SearchState {
	comicsList: Comics[];
	suggestList: Comics[];
	isLoading: boolean;
	isSuggestLoading: boolean;
	error: string;
	suggestError: string;
}

const initialState: SearchState = {
	comicsList: [],
	suggestList: [],
	isSuggestLoading: false,
	isLoading: false,
	error: '',
	suggestError: ''
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		clearSuggestList: state => {
			state.suggestList = [];
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchComicsByTitle.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchComicsByTitle.fulfilled, (state, action) => {
				state.comicsList = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchComicsByTitle.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(fetchSuggestComicsByTitle.pending, state => {
				state.isSuggestLoading = true;
			})
			.addCase(fetchSuggestComicsByTitle.fulfilled, (state, action) => {
				state.suggestList = action.payload;
				state.isSuggestLoading = false;
			})
			.addCase(fetchSuggestComicsByTitle.rejected, (state, action) => {
				state.suggestError = action.payload as string;
			});
	}
});

export const { clearSuggestList } = searchSlice.actions;
export default searchSlice.reducer;
