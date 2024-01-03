'use client'
import {
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Button,
} from '@nextui-org/react'
import Image from 'next/image'
import {useSession, signIn, signOut} from 'next-auth/react'

export default function AvatarComponent(): JSX.Element {
	const {data: session} = useSession()
	const user = session && session.user

	if (user && user.image != undefined && user.email) {
		return (
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					{/* <Avatar
								as="button"
								className="!opacity-100 transition-transform bg-white border-white ring-0"
								size="sm"
								src={imageUrl}
								ImgComponent={Image}
								imgProps={{
									width: 20,
									height: 20,
									loading: 'eager'
								}}
							/> */}
					<Image
						src={user.image}
						width={40}
						height={40}
						alt="Avatar"
						className="hover:cursor-pointer rounded-full"
					/>
				</DropdownTrigger>
				<DropdownMenu
					aria-label="Profile Actions"
					variant="flat"
				>
					<DropdownItem
						key="profile"
						className="h-14 gap-2"
					>
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{user.email}</p>
					</DropdownItem>
					<DropdownItem key="settings">My Settings</DropdownItem>
					<DropdownItem
						key="logout"
						onClick={() => signOut()}
						color="danger"
					>
						Sign Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		)
	} else {
		return (
			<Button
				color="primary"
				onClick={async () =>
					await signIn('google', {
						callbackUrl: '/game',
					})
				}
				variant="flat"
			>
				Login
			</Button>
		)
	}
}
