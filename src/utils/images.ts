import { Comics } from '../models/comics';

export enum FormatEnum {
	portrait,
	square
}

export const getImage = (item: Comics, format: FormatEnum): string => {
	switch (format) {
		case FormatEnum.portrait:
			return `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`;
		case FormatEnum.square:
			return `${item.thumbnail.path}/standard_medium.${item.thumbnail.extension}`;
	}
};
