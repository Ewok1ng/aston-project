import { Comics } from '../models/comics';
import {
	useAddToFavouriteMutation,
	useFetchAllFavouriteQuery,
	useRemoveFromFavouriteMutation
} from '../store/api/favourite-api';

import { useAuth } from './auth';

export const useFavourite = () => {
	const { user } = useAuth();
	const { data: favouriteList = [] } = useFetchAllFavouriteQuery(user?.email);

	const [addFavourite, addResult] = useAddToFavouriteMutation();
	const [removeFavourite, removeResult] = useRemoveFromFavouriteMutation();

	const isComicsFavourite = (id: number) => {
		return favouriteList.find(item => item.id === id) ? true : false;
	};

	const addToFavourite = async (data: Comics | undefined) => {
		await addFavourite({ email: user?.email, comics: data });
	};

	const removeFromFavourite = async (data: Comics | undefined) => {
		await removeFavourite({ email: user?.email, comics: data });
	};

	return {
		isFavourite: isComicsFavourite,
		isDisabled: addResult.isLoading || removeResult.isLoading,
		addToFavourite,
		removeFromFavourite
	};
};
