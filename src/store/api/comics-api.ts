import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ComicsResponseType } from '../../models/comics-response';
import { Comics } from '../../models/comics';
import { transformComics } from '../../utils/transform-comics';

const queryParams = {
	apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
	ts: '1',
	hash: process.env.REACT_APP_MARVEL_MD5,
	format: 'comic'
};

export const comicsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_MARVEL_API_URL
	}),
	reducerPath: 'allComicsApi',
	endpoints: build => ({
		fetchAllComics: build.query<Comics[], void>({
			query: () => ({
				url: '/comics?',
				params: queryParams
			}),
			transformResponse: (res: ComicsResponseType) => transformComics(res)
		}),
		fetchComicsById: build.query<Comics, string>({
			query: id => ({
				url: '/comics?',
				params: {
					...queryParams,
					id: parseInt(id)
				}
			}),
			transformResponse: (res: ComicsResponseType) => {
				const comicsList = transformComics(res);
				return comicsList[0];
			}
		}),
		fetchComicsByTitle: build.query<Comics[], string>({
			query: title => ({
				url: '/comics?',
				params: {
					...queryParams,
					titleStartsWith: title
				}
			}),
			transformResponse: (res: ComicsResponseType) => transformComics(res)
		}),
		fetchSuggestComicsByTitle: build.query<Comics[], string>({
			query: title => ({
				url: '/comics?',
				params: {
					...queryParams,
					titleStartsWith: title,
					limit: 5
				}
			}),
			transformResponse: (res: ComicsResponseType) => transformComics(res)
		})
	})
});

export const {
	useFetchAllComicsQuery,
	useFetchComicsByIdQuery,
	useFetchComicsByTitleQuery,
	useLazyFetchSuggestComicsByTitleQuery,
	useFetchSuggestComicsByTitleQuery
} = comicsApi;
