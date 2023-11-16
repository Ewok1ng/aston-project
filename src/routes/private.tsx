import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
	isAuth: boolean;
}

export function Private({ isAuth }: Props) {
	return isAuth ? <Outlet /> : <Navigate to="/signin" />;
}
