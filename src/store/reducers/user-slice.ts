import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LsUser, FsUser } from '../../models/user';

interface UserState {
	user: FsUser | LsUser | null;
}

const initialState: UserState = {
	user: null
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
		}
	}
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
