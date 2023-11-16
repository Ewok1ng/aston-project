import { combineReducers, configureStore } from '@reduxjs/toolkit';

import comicsReducer from './reducers/comics-slice';
import singleComicsReducer from './reducers/single-comics-slice';
import userReducer from './reducers/user-slice';

const rootReducer = combineReducers({
	comicsReducer,
	singleComicsReducer,
	userReducer
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
