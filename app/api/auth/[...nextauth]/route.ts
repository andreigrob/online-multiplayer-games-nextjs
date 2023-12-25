import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],
	session: { strategy: 'jwt' }
};

function handler(req: NextRequest, res: NextApiResponse) {
	return NextAuth(req as unknown as NextApiRequest, res, authOptions);
}

export { handler as GET, handler as POST };
