import { createSlice } from '@reduxjs/toolkit';

import { HistoryItem } from '../../../models/history';

import { addHistory, fetchAllHistory, removeHistory } from './action-creators';

interface HistoryState {
	historyList: HistoryItem[];
	isLoading: boolean;
	error: string;
}

const initialState: HistoryState = {
	historyList: [],
	isLoading: false,
	error: ''
};

export const historySlice = createSlice({
	name: 'history',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addHistory.fulfilled, (state, action) => {
				state.historyList.push(action.payload as HistoryItem);
			})
			.addCase(addHistory.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(fetchAllHistory.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchAllHistory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.historyList = action.payload as HistoryItem[];
			})
			.addCase(fetchAllHistory.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(removeHistory.fulfilled, (state, action) => {
				if (action.payload) {
					state.historyList = state.historyList.filter(
						item => item.timestamp !== action.payload
					);
				}
			})
			.addCase(removeHistory.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	}
});

export default historySlice.reducer;
