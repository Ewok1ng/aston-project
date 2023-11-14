import { combineReducers, configureStore } from '@reduxjs/toolkit';

import comicsReducer from './reducers/comics-slice';
import singleComicsReducer from './reducers/single-comics-slice';

const rootReducer = combineReducers({
	comicsReducer,
	singleComicsReducer
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
