import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import AuthProvider from '@/context/auth-provider'
import {getServerSession} from 'next-auth/next'
import {Navbar} from '@/components'
import NextProvider from '@/context/nextui-provider'

const inter = Inter({
	subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
})

export const metadata: Metadata = {
	title: 'Online Multiplayer Games',
	description: 'Andrei Grobnic',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession()

	return (
		<html
			lang="en"
			className="light h-full scroll-smooth antialiased"
		>
			<body className={`${inter.className} flex flex-col`}>
				<NextProvider>
					<AuthProvider session={session}>
						<Navbar />
						{children}
					</AuthProvider>
				</NextProvider>
			</body>
		</html>
	)
}
