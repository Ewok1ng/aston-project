import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setUser, removeUser } from '../reducers/user-slice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: setUser,
	effect: action => {
		console.log('User added: ', action.payload.email);
	}
});

listenerMiddleware.startListening({
	actionCreator: removeUser,
	effect: () => {
		console.log('User removed');
	}
});
