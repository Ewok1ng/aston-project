import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { comicsApi } from './api/comics-api';
import { favouriteApi } from './api/favourite-api';
import { historyApi } from './api/history-api';
import userReducer from './reducers/user-slice';
import { listenerMiddleware } from './middlewares/user-middleware';

const rootReducer = combineReducers({
	[comicsApi.reducerPath]: comicsApi.reducer,
	[favouriteApi.reducerPath]: favouriteApi.reducer,
	[historyApi.reducerPath]: historyApi.reducer,
	userReducer
});

const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false
			}).concat([
				comicsApi.middleware,
				favouriteApi.middleware,
				historyApi.middleware,
				listenerMiddleware.middleware
			])
	});
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
