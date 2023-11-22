export type ComicsResponseType = {
	code: number;
	status: string;
	copyright: string;
	attributionText: string;
	attributionHTML: string;
	etag: string;
	data: DataType;
};

interface DataType {
	offset: number;
	limit: number;
	total: number;
	count: number;
	results: Comics[];
}

interface Comics {
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description: null | string;
	modified: Date;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: TextObject[];
	resourceURI: string;
	urls: URL[];
	series: Series;
	variants: Series[];
	collections: Series[];
	collectedIssues: Series[];
	dates: DateElement[];
	prices: Price[];
	thumbnail: Thumbnail;
	images: Thumbnail[];
	creators: Creators;
	characters: Characters;
	stories: Stories;
	events: Events;
}

interface Characters {
	available: number;
	collectionURI: string;
	items: Series[];
	returned: number;
}

interface Series {
	resourceURI: string;
	name: string;
}

interface Creators {
	available: number;
	collectionURI: string;
	items: CreatorsItem[];
	returned: number;
}

interface Events {
	available: number;
	collectionURI: string;
	items: EventItem[];
	returned: number;
}

interface EventItem {
	resourceURI: string;
	name: string;
}

interface CreatorsItem {
	resourceURI: string;
	name: string;
	role: string;
}

interface DateElement {
	type: string;
	date: Date;
}

interface Thumbnail {
	path: string;
	extension: string;
}

interface Price {
	type: string;
	price: number;
}

interface Stories {
	available: number;
	collectionURI: string;
	items: StoriesItem[];
	returned: number;
}

interface StoriesItem {
	resourceURI: string;
	name: string;
	type: string;
}

interface TextObject {
	type: string;
	language: string;
	text: string;
}

interface URL {
	type: string;
	url: string;
}
