export interface Comics {
	id: number;
	title: string;
	description: string | null;
	onSaleDate: Date | null;
	pageCount: number;
	printPrice: number | null;
	thumbnail: {
		path: string;
		extension: string;
	};
	creators: {
		name: string;
		role: string;
	}[];
}
