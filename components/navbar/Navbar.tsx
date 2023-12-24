'use client';
import { menuItems, menuURL } from './navList';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	Link,
	Button,
	NavbarMenuItem
} from '@nextui-org/react';

import { useState } from 'react';

import { useSession, signIn } from 'next-auth/react';
import AvatarComponent from './Avatar';

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { data: session } = useSession();
	return (
		<>
			<Navbar onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
						className="sm:hidden"
					/>
					<NavbarBrand>
						<a href="/" className="font-bold text-inherit">
							Game Platform
						</a>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent
					className="hidden sm:flex gap-4"
					justify="center"
				>
					{menuItems.map((item, index) => (
						<NavbarItem key={`${item}-${index}`}>
							<Link href={menuURL[index]}>{item}</Link>
						</NavbarItem>
					))}
				</NavbarContent>
				<NavbarContent justify="end">
					{session ? (
						<AvatarComponent
							email={session.user?.email!}
							imageUrl={session.user?.image!}
						/>
					) : (
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								onClick={async () =>
									await signIn('google', {
										callbackUrl: '/game'
									})
								}
								variant="flat"
							>
								Login
							</Button>
						</NavbarItem>
					)}
				</NavbarContent>

				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link className="w-full" href={menuURL[index]}>
								{item}
							</Link>
						</NavbarMenuItem>
					))}
					<NavbarMenuItem>
						<Link
							className="w-full"
							href="/api/auth/signin?callbackUrl=%2Fgame"
						>
							Login
						</Link>
					</NavbarMenuItem>
				</NavbarMenu>
			</Navbar>
		</>
	);
}

export default Nav;
