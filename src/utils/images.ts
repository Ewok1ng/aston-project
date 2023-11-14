import { Comics } from '../types/comics-response';

export enum FormatEnum {
	portrait,
	square
}

export const getImage = (item: Comics, format: FormatEnum) => {
	switch (format) {
		case FormatEnum.portrait:
			return `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`;
		case FormatEnum.square:
			return `${item.thumbnail.path}/standard_medium.${item.thumbnail.extension}`;
	}
};
