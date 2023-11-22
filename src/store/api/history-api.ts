import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

import { HistoryItem } from '../../models/history';
import { historyCollection } from '../../firebase';
import { getAuthUser } from '../../services/ls-auth';
import { getLsData, setLsData } from '../../services/ls-data';

export const historyApi = createApi({
	baseQuery: fakeBaseQuery(),
	reducerPath: 'historyApi',
	tagTypes: ['History'],
	endpoints: build => ({
		fetchAllHistory: build.query<HistoryItem[], void>({
			async queryFn() {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							const historySnapshot =
								await getDocs(historyCollection);
							const historyList = historySnapshot.docs.map(doc =>
								doc.data()
							);

							return { data: historyList };
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
			async queryFn(name: string) {
				const date = new Date().toJSON();
				const history = {
					timestamp: date,
					name
				};

				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							const historyRef = doc(historyCollection, date);

							await setDoc(historyRef, history);

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
			async queryFn(timestamp: string) {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							const historyRef = doc(
								historyCollection,
								timestamp
							);
							await deleteDoc(historyRef);

							return { data: timestamp };
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
										item => item.timestamp !== timestamp
									);
								setLsData(authUser, userData);
							}

							return { data: timestamp };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: '' };
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
