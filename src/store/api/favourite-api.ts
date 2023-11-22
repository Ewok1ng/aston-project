import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

import { Comics } from '../../models/comics';
import { favouriteCollection } from '../../firebase';
import { getAuthUser } from '../../services/ls-auth';
import { getLsData, setLsData } from '../../services/ls-data';

export const favouriteApi = createApi({
	baseQuery: fakeBaseQuery(),
	reducerPath: 'favouriteApi',
	tagTypes: ['Favourite'],
	endpoints: build => ({
		fetchAllFavourite: build.query<Comics[], void>({
			async queryFn() {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							const favSnapshot =
								await getDocs(favouriteCollection);
							const favList = favSnapshot.docs.map(doc =>
								doc.data()
							);

							return { data: favList };
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
			async queryFn(comics: Comics) {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							const favouriteRef = doc(
								favouriteCollection,
								comics.id.toString()
							);

							await setDoc(favouriteRef, comics);

							return { data: comics };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData) {
								userData.favouriteList.push(comics);
								setLsData(authUser, userData);
							}

							return { data: comics };
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
			async queryFn(comics: Comics) {
				switch (process.env.REACT_APP_REMOTE_STORE) {
					case 'firebase':
						try {
							const favouriteRef = doc(
								favouriteCollection,
								comics.id.toString()
							);
							await deleteDoc(favouriteRef);

							return { data: comics };
						} catch (e) {
							return { error: e };
						}
					case 'ls':
						try {
							const authUser = getAuthUser();
							const userData = getLsData(authUser);

							if (userData) {
								userData.favouriteList =
									userData.favouriteList.filter(
										item => item.id !== comics.id
									);
								setLsData(authUser, userData);
							}

							return { data: comics };
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
