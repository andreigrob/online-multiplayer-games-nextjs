import NextAuth, {AuthOptions} from 'next-auth'
import {NextApiRequest, NextApiResponse} from 'next'
import {NextRequest} from 'next/server'
import GoogleProvider from 'next-auth/providers/google'
import {Adapter} from 'next-auth/adapters'
import {PrismaAdapter} from '@auth/prisma-adapter'
import {prisma} from '@/app/api/lib'

const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {strategy: 'jwt'},
}

function handler(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, authOptions)
}

export {handler as GET, handler as POST}
