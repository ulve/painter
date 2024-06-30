import { writeFileSync } from 'fs';
import { sql } from '@vercel/postgres';

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const tags = formData.tags.split(' ');
		const file = formData.fileToUpload;

		writeFileSync(`static/${file.name}`, Buffer.from(await file.arrayBuffer()));

		return {
			success: true
		};
	}
};
export async function load({ locals }) {
	console.log('hejhej');
	return {
		cart: await sql`SELECT * from IMAGES`
	};
}
