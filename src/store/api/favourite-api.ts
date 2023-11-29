import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc
} from 'firebase/firestore';

import { Comics } from '../../models/comics';
import { db } from '../../firebase';
import { getAuthUser } from '../../services/ls-auth';
import { getLsData, setLsData } from '../../services/ls-data';
import { userConverter } from '../../utils/user-converter';

export const favouriteApi = createApi({
	baseQuery: fakeBaseQuery(),
	reducerPath: 'favouriteApi',
	tagTypes: ['Favourite'],
	refetchOnMountOrArgChange: true,
	endpoints: build => ({
		fetchAllFavourite: build.query<Comics[], string | null | undefined>({
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
								return { data: userData.favourite };
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
								return { data: userData.favouriteList };
							}

							return { data: [] };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: [] };
				}
			},
			providesTags: ['Favourite']
		}),
		addToFavourite: build.mutation({
			async queryFn(args: {
				email: string | null | undefined;
				comics: Comics | undefined;
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
								favourite: arrayUnion(args.comics)
							});
							return { data: args.comics };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData && args.comics !== undefined) {
								userData.favouriteList.push(args.comics);
								setLsData(authUser, userData);
							}

							return { data: args.comics };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: {} };
				}
			},
			invalidatesTags: ['Favourite']
		}),
		removeFromFavourite: build.mutation({
			async queryFn(args: {
				email: string | null | undefined;
				comics: Comics | undefined;
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
								favourite: arrayRemove(args.comics)
							});

							return { data: args.comics };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData) {
								userData.favouriteList =
									userData.favouriteList.filter(item => {
										if (args.comics !== undefined) {
											return item.id !== args.comics.id;
										}
										return item;
									});
								setLsData(authUser, userData);
							}

							return { data: args.comics };
						} catch (e) {
							return { error: e };
						}
					default:
						return { data: {} };
				}
			},
			invalidatesTags: ['Favourite']
		})
	})
});

export const {
	useFetchAllFavouriteQuery,
	useAddToFavouriteMutation,
	useRemoveFromFavouriteMutation
} = favouriteApi;
