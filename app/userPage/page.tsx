'use client';
import { useSession, signIn } from 'next-auth/react';

export default function UserPage() {
	const { data: session } = useSession();
	return (
		<div className="flex flex-col items-center">
			Signed in <br />
			{session?.user?.name}
			<br />
			{session?.user?.email}
			<br />
		</div>
	);
}
