/*
    Southampton University Formula Student Team
    Copyright (C) 2021 Nathan Rowley-Smith

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { url } from 'config';
import { UserGet, UserPatch } from 'types/api/api';
import { SetUserAction } from 'types/models/actions';

const handleGetUser: UserGet = async (accessToken) => {
	const response = await fetch(`http://${url}/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	const data = await response.json();
	return data;
};

type UserGetPromise = (username: string, accessToken: string) => Promise<SetUserAction | null>;

export const getUser: UserGetPromise = async (username: string, accessToken: string) => {
	const user: SetUserAction = {
		username,
		accessToken,
		creation: new Date().valueOf() / 1000,
		privilege: 'Anon',
		department: 'NON SPECIFIED',
		meta: {}
	};

	if (username === 'anonymous') {
		return user;
	}

	try {
		const data = await handleGetUser(accessToken);

		user.username = data.username;
		user.creation = data.creation;
		user.privilege = data.privilege;
		user.department = data.department;
		user.meta = JSON.parse(data.meta);
	} catch (statusText) {
		console.error('Error Getting User:', statusText);
		return null;
	}

	return user;
};

const handleUserPatch: UserPatch = async (accessToken, fields) => {
	const response = await fetch(`http://${url}/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + accessToken
		},
		body: JSON.stringify(fields)
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	return response;
};

export const userPatch: UserPatch = async (accessToken, fields) => {
	try {
		const response = await handleUserPatch(accessToken, fields);

		if (response.status === 200) {
			return true;
		}

		return false;
	} catch (statusText) {
		console.log('Error in User Patch: ', statusText);
		return false;
	}
};
