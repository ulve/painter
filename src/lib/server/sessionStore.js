import { randomBytes } from 'node:crypto';
import { sql } from '@vercel/postgres';

function getSid() {
	return randomBytes(32).toString('hex');
}

export async function createSession(username, maxAge) {
	let sid = getSid();

	await setPsqlSession(sid, username, new Date(Date.now() + maxAge));

	return sid;
}

async function getPsqlSession(sid) {
	const sessions = await sql`SELECT * FROM sessions WHERE sid=${sid}`;
	return sessions.rows[0];
}

async function setPsqlSession(sid, username, invalidAt) {
	await sql`INSERT INTO sessions (sid, username, invalidAt) VALUES (${sid}, ${username}, ${invalidAt});`;
}

async function deletePsqlSession(sid) {
	await sql`delete from sessions where sid=${sid}`;
}

export async function getSession(sid) {
	const session = await getPsqlSession(sid);
	if (session) {
		if (Date.now() > session.invalidAt) {
			console.log('delete invalid session', sid);
			await deletePsqlSession(sid);
			return undefined;
		} else {
			return session;
		}
	} else {
		console.log('session not found', sid);
		return undefined;
	}
}
