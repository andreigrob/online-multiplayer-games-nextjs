import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createGame(player1: string, player2: string, gameType: number) {
	prisma.;
}

export async function POST(request: NextRequest) {
	const { player1, player2, gameType } = await request.json();

	createGame(player1, player2, Number.parseInt(gameType))
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
	return NextResponse.json({ message: 'Game created' }, { status: 200 });
}

/*
//async
function handler(req: NextRequest) {
	console.log(req.headers);
	console.log(req.body);
	const requestMethod = req.method;
	//let v = await req.body?.getReader().read();

	const body = req.json();
	console.log(body);

	console.log(requestMethod);
	return Response.json({});
}

export { handler as GET, handler as POST };
*/
/*
import type { NextApiRequest, NextApiResponse } from 'next';

export function POST(request: NextApiRequest, response: NextApiResponse) {
	//const { player1, player2, gameType } = JSON.parse(request.body);
	const body = request.body;
	console.log(body);
	response.status(200).json({});
}
function handler(req: NextRequest, res: NextApiResponse) {
	return NextAuth(req as unknown as NextApiRequest, res, authOptions);
}

export { handler as GET, handler as POST };*/
