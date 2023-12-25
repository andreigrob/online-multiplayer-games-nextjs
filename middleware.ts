import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
	// Get the pathname of the request (e.g. /, /protected)
	const path = req.nextUrl.pathname;

	// If it's the root path, just render it
	if (path === '/') {
		return NextResponse.next();
	}

	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET
	});
	const protectedList = ['/game', '/userPage'];
	const isProtected = protectedList.includes(path);

	/*	const isProtected = () => {

		protectedList.forEach( (x) => {
		if (path.includes(x)) {
			return true;
		}

	});*/
	console.log(path);
	console.log(path.length);
	console.log(isProtected);
	//const isProtected = path.includes('/game') || path.includes('/userPage');

	if (!session && isProtected) {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}
