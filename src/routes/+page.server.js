import { writeFileSync } from 'fs';
import { sql } from '@vercel/postgres';

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const tags = formData.tags.split(' ');
		const file = formData.fileToUpload;
		console.log('HEJHEJ');

		//writeFileSync(`static/${file.name}`, Buffer.from(await file.arrayBuffer()));
		var today = new Date();

		await sql`INSERT INTO events (image_name, date) VALUES ('${file.name}', '${today}');`;

		return {
			success: true
		};
	}
};
export async function load({ locals }) {
	let events = await sql`SELECT * from EVENTS`;
	console.log(events);
	return {
		events
	};
}
