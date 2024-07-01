/*import { error } from '@sveltejs/kit';
const allowedOrigins = ['http://localhost:3000'];

const csrf = (event, allowedOrigins) => {
	const { request, url } = event;

	const forbidden =
		isFormContentType(request) &&
		(request.method === 'POST' ||
			request.method === 'PUT' ||
			request.method === 'PATCH' ||
			request.method === 'DELETE') &&
		!allowedOrigins.includes(request.headers.get('origin') || '');

	if (forbidden) {
		error(403, `Cross-site ${request.method} form submissions are forbidden`);
	}
};

function isContentType(request, ...types) {
	const type = request.headers.get('content-type')?.split(';', 1)[0].trim() ?? '';
	return types.includes(type.toLowerCase());
}
function isFormContentType(request) {
	// These content types must be protected against CSRF
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype
	return isContentType(
		request,
		'application/x-www-form-urlencoded',
		'multipart/form-data',
		'text/plain'
	);
}

export const handle = async ({ event, resolve }) => {
	csrf(event, allowedOrigins);
	return await resolve(event);
};*/
import { getSession } from '$lib/server/sessionStore';
export const handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid', { path: '/' });
	if (sid) {
		const session = await getSession(sid);
		if (session) {
			event.locals.username = session.username;
		} else {
			// remove invalid/expired/unknown cookie
			cookies.delete('sid', { path: '/' });
		}
	}

	const response = await resolve(event);
	return response;
};
