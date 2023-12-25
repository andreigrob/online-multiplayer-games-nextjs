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
	NavbarMenuItem
} from '@nextui-org/react';

import { useState } from 'react';

import AvatarComponent from './Avatar';

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
					<AvatarComponent />
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
