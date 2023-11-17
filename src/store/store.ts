import { combineReducers, configureStore } from '@reduxjs/toolkit';

import allComicsReducer from './reducers/all-comics/slice';
import singleComicsReducer from './reducers/comics/slice';
import userReducer from './reducers/user/slice';
import favouriteReducer from './reducers/favourite/slice';

const rootReducer = combineReducers({
	allComicsReducer,
	singleComicsReducer,
	userReducer,
	favouriteReducer
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
