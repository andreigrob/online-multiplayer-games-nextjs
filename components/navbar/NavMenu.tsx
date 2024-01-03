'use client'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react'
import Image from 'next/image'
import book from '@/public/book.jpg'
import {menuI} from './navList'

export default function NavMenu(): JSX.Element {
	return (
		<Dropdown>
			<DropdownTrigger>
				<Image
					src={book}
					width={40}
					alt="Book"
					className="hover:cursor-pointer"
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Go">
				{menuI.map((item, index) => (
					<DropdownItem
						key={`${item.name}-${index}`}
						href={item.url}
					>
						{item.name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	)
}
