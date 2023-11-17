export const COMICS_URL = `${process.env.REACT_APP_MARVEL_API_URL}/comics`;
export const COMICS_QUERY_PARAMS = {
	apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
	ts: 1,
	hash: process.env.REACT_APP_MARVEL_MD5,
	format: 'comic'
};
