import {
	NavbarContent,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';

export default function AvatarComponent({
	email,
	imageUrl
}: {
	email: string;
	imageUrl: string;
}) {
	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform bg-white border-white ring-0"
					size="sm"
					src={imageUrl}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
				<DropdownItem key="profile" className="h-14 gap-2">
					<p className="font-semibold">Signed in as</p>
					<p className="font-semibold">{email}</p>
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
	);
}
