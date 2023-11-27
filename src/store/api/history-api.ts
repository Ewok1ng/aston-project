import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc
} from 'firebase/firestore';

import { HistoryItem } from '../../models/history';
import { db } from '../../firebase';
import { getAuthUser } from '../../services/ls-auth';
import { getLsData, setLsData } from '../../services/ls-data';
import { userConverter } from '../../utils/user-converter';

export const historyApi = createApi({
	baseQuery: fakeBaseQuery(),
	reducerPath: 'historyApi',
	tagTypes: ['History'],
	refetchOnMountOrArgChange: true,
	endpoints: build => ({
		fetchAllHistory: build.query<HistoryItem[], string | null | undefined>({
			async queryFn(email) {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							if (!email) {
								return { data: [] };
							}

							const userRef = doc(
								db,
								'users',
								email
							).withConverter(userConverter);
							const user = await getDoc(userRef);

							const userData = user.data();

							if (userData) {
								return { data: userData.history };
							}

							return { data: [] };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData) {
								return { data: userData.historyList };
							}

							return { data: [] };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: [] };
				}
			},
			providesTags: ['History']
		}),
		addToHistory: build.mutation({
			async queryFn(args: {
				email: string | null | undefined;
				name: string;
			}) {
				const date = new Date().toJSON();
				const history = {
					timestamp: date,
					name: args.name
				};

				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							if (!args.email) {
								return { data: [] };
							}

							const userRef = doc(
								db,
								'users',
								args.email
							).withConverter(userConverter);

							await updateDoc(userRef, {
								history: arrayUnion(history)
							});
							return { data: history };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData) {
								userData.historyList.push(history);
								setLsData(authUser, userData);
							}

							return { data: history };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: {} };
				}
			},
			invalidatesTags: ['History']
		}),
		removeFromHistory: build.mutation({
			async queryFn(args: {
				email: string | null | undefined;
				historyItem: HistoryItem;
			}) {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							if (!args.email) {
								return { data: [] };
							}

							const userRef = doc(
								db,
								'users',
								args.email
							).withConverter(userConverter);

							await updateDoc(userRef, {
								history: arrayRemove(args.historyItem)
							});

							return { data: args.historyItem };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData) {
								userData.historyList =
									userData.historyList.filter(
										item =>
											item.timestamp !==
											args.historyItem.timestamp
									);
								setLsData(authUser, userData);
							}

							return { data: args.historyItem };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: {} };
				}
			},
			invalidatesTags: ['History']
		})
	})
});

export const {
	useFetchAllHistoryQuery,
	useAddToHistoryMutation,
	useRemoveFromHistoryMutation
} = historyApi;
