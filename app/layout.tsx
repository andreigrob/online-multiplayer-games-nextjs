import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/auth-provider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Navbar } from '@/components';
import NextProvider from '@/context/nextui-provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en" className="light">
			<body className={inter.className}>
				<NextProvider>
					<AuthProvider session={session}>
						<Navbar />
						{children}
					</AuthProvider>
				</NextProvider>
			</body>
		</html>
	);
}
