import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

export function History() {
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth]);

	return <div>History</div>;
}
