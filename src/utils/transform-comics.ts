import { Comics } from '../models/comics';
import { ComicsResponseType } from '../models/comics-response';

export const transformComics = (res: ComicsResponseType): Comics[] => {
	const comicsList = res.data.results;
	const data = comicsList.map(comics => ({
		id: comics.id,
		title: comics.title,
		description: comics.description,
		onSaleDate:
			comics.dates.find(date => date.type === 'onsaleDate')?.date || null,
		pageCount: comics.pageCount,
		printPrice:
			comics.prices.find(price => price.type === 'printPrice')?.price ||
			null,
		thumbnail: comics.thumbnail,
		creators: comics.creators.items.map(item => ({
			name: item.name,
			role: item.role
		}))
	}));

	return data;
};
