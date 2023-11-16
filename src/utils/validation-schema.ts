import * as yup from 'yup';

export const validationSchema = yup.object({
	email: yup
		.string()
		.required('Email is a required field')
		.email('Not a proper email'),
	password: yup
		.string()
		.required('Password is a required field')
		.min(8, 'Must be at least 8 characters long')
});
