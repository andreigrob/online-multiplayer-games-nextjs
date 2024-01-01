import {menuI} from './navList'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from '@nextui-org/react'

import Link from 'next/link'

import AvatarComponent from './Avatar'
import NavMenu from './NavMenu'

export default function Nav(): React.JSX.Element {
	let str: string
	return (
		<div className="w-full font-sans text-xl mx-auto my-4 items-end">
			<Navbar className="w-full">
				<NavbarBrand>
					<Link
						href="/"
						className="font-bold"
					>
						Game Platform
					</Link>
				</NavbarBrand>
				<NavbarContent justify="end">
					<div className="hidden md:flex">
						{menuI.map((item, index) => (
							<NavbarItem key={(str = `${item.name}-${index}`)}>
								<Button
									key={str}
									as={Link}
									className=" text-black mx-5"
									href={item.url}
								>
									{item.name}
								</Button>
							</NavbarItem>
						))}
					</div>
					<div className="md:hidden">
						<NavMenu />
					</div>
					<AvatarComponent />
				</NavbarContent>
			</Navbar>
		</div>
	)
}
