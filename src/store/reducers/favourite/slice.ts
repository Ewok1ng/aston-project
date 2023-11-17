import { createSlice } from '@reduxjs/toolkit';

import { Comics } from '../../../types/comics-response';

import {
	addFavourite,
	fetchAllFavourite,
	removeFavourite
} from './action-creators';

interface FavouriteState {
	favouriteList: Comics[];
	isLoading: boolean;
	error: string;
}

const initialState: FavouriteState = {
	favouriteList: [],
	isLoading: false,
	error: ''
};

export const favouriteSlice = createSlice({
	name: 'favourite',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addFavourite.pending, () => {})
			.addCase(addFavourite.fulfilled, (state, action) => {
				if (action.payload) {
					state.favouriteList.push(action.payload);
				}
			})
			.addCase(addFavourite.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(removeFavourite.pending, () => {})
			.addCase(removeFavourite.fulfilled, (state, action) => {
				if (action.payload) {
					state.favouriteList = state.favouriteList.filter(
						item => item.id !== action.payload?.id
					);
				}
			})
			.addCase(removeFavourite.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(fetchAllFavourite.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchAllFavourite.fulfilled, (state, action) => {
				if (action.payload) {
					state.favouriteList = action.payload;
					state.isLoading = false;
					state.error = '';
				}
			})
			.addCase(fetchAllFavourite.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	}
});

export default favouriteSlice.reducer;
