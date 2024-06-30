import { fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';

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
