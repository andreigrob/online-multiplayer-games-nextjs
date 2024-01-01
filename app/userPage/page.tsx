'use client';
import {useSession} from 'next-auth/react';

export default function UserPage(): React.JSX.Element {
	const info = useSession();
	const user = info.data?.user;
	return (
		<div className="flex flex-col items-center">
			<p>Signed in</p>
			<p>{user?.name}</p>
			<p>{user?.email}</p>
		</div>
	);
}
