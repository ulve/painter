import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/sessionStore';
import { AUTH_USERNAME, AUTH_PASSWORD } from '$env/static/private';

async function performLogin(cookies, username) {
	const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
	console.log(username);
	const sid = await createSession(username, maxAge);
	cookies.set('sid', sid, { maxAge, path: '/' });
}

function checkUserCredentials(username, password) {
	console.log(AUTH_USERNAME);
	if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
		return true;
	}

	return false;
}

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (username && password) {
			const res = checkUserCredentials(username, password);

			if (!res) {
				return fail(401, { errorMessage: 'Invalid username or password' });
			}

			await performLogin(cookies, username);

			// redirect to home page
			throw redirect(303, '/');
		} else {
			return fail(400, { errorMessage: 'Missing username or password' });
		}
	}
};
