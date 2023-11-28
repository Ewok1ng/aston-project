import moment from 'moment';

export const formatTimestamp = (timestamp: string): string => {
	return new Date(timestamp).toLocaleString();
};

export const formateDate = (date: Date): string => {
	return moment(date).format('DD MMM YYYY');
};
