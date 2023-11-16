import { User } from 'firebase/auth';

export interface FsUser extends User {}
export interface LsUser {
	email: string;
	password: string;
}
