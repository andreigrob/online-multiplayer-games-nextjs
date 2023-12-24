import NextAuth from 'next-auth';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

function handler(req: NextRequest, res: NextApiResponse) {
	return NextAuth(req as unknown as NextApiRequest, res, authOptions);
}

export { handler as GET, handler as POST };
