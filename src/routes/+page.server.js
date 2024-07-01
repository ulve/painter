import { error } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions = {
	upload: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());
		const file = form.fileToUpload;
		const { username } = locals;

		if (!file) {
			error(400, { message: 'No file to upload.' });
		}

		if (username !== 'olov') {
			error(403, { message: 'You are not choosen' });
		}

		const { url } = await put(file.name, file, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});
		var today = new Date();

		await sql`INSERT INTO events (image_name, date) VALUES (${url}, ${today.toISOString()});`;
		return { uploaded: url };
	}
};

export async function load() {
	let events = await sql`SELECT * from EVENTS`;
	return {
		events: events.rows
	};
}
