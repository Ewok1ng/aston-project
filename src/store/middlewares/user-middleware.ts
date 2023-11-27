import { createListenerMiddleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { setUser, removeUser } from '../reducers/user-slice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: setUser,
	effect: action => {
		toast.success(`User logged in: ${action.payload.email}`);
	}
});

listenerMiddleware.startListening({
	actionCreator: removeUser,
	effect: () => {
		toast.success('User logged out');
	}
});
