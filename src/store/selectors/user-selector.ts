import { RootState } from '../store';

export const isLoading = (state: RootState) => state.userReducer.isLoading;
export const user = (state: RootState) => state.userReducer.user;
