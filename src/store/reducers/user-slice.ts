import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LsUser, FsUser } from '../../models/user';

interface UserState {
	user: FsUser | LsUser | null;
	isLoading: boolean;
}

const initialState: UserState = {
	user: null,
	isLoading: true
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<FsUser | LsUser>) => {
			state.user = action.payload;
		},
		removeUser: state => {
			state.user = null;
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		}
	}
});

export const { setUser, removeUser, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
