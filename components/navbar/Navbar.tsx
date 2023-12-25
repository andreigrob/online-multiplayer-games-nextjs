'use client';
import { menuItems, menuURL } from './navList';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem
} from '@nextui-org/react';

import Link from 'next/link';

import { useState } from 'react';

import AvatarComponent from './Avatar';

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<nav className="hidden md:flex flex-row w-2/3 justify-between items-center mx-auto my-4">
				<Link href="/" className="font-bold text-inherit">
					Game Platform
				</Link>
				<ul className="hidden sm:flex gap-4">
					{menuItems.map((item, index) => (
						<li className='ml-4' key={`${item}-${index}`}>
							<Link className=" text-black" href={menuURL[index]}>
								{item}
							</Link>
						</li>
					))}
				</ul>
				<AvatarComponent />
			</nav>
			<Navbar className="md:hidden" onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent className="w-full">
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					/>
					<NavbarBrand>
						<Link href="/" className="font-bold text-inherit">
							Game Platform
						</Link>
					</NavbarBrand>
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
				</NavbarMenu>
			</Navbar>
		</>
	);
}

export default Nav;
