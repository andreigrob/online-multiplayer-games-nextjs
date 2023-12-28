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

export default function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<nav className="hidden md:flex flex-row w-2/3 justify-between items-center mx-auto my-4">
				<Link
					href="/"
					className="font-bold text-inherit font-sans text-xl"
				>
					Game Platform
				</Link>
				<div className="flex flex-col items-end font-sans text-xl">
					<ul className="hidden sm:flex gap-5">
						{menuItems.map((item, index) => (
							<li key={`${item}-${index}`}>
								<Link
									className=" text-black"
									href={menuURL[index]}
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
				</div>
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
