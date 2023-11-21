import { combineReducers, configureStore } from '@reduxjs/toolkit';

import allComicsReducer from './reducers/all-comics/slice';
import singleComicsReducer from './reducers/comics/slice';
import userReducer from './reducers/user/slice';
import favouriteReducer from './reducers/favourite/slice';
import searchReducer from './reducers/search/slice';
import historyReducer from './reducers/history/slice';

const rootReducer = combineReducers({
	allComicsReducer,
	singleComicsReducer,
	userReducer,
	favouriteReducer,
	searchReducer,
	historyReducer
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false
			})
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
