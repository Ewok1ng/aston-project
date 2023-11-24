import moment from 'moment';

export const formatTimestamp = (timestamp: string) => {
	return new Date(timestamp).toLocaleString();
};

export const formateDate = (date: Date) => {
	return moment(date).format('DD MMM YYYY');
};
