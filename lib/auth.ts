import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
	adapter: prisma as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],
	session: { strategy: 'jwt' }
};
