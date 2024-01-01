import {Button} from '@nextui-org/react';
import Link from 'next/link';

export default function GameLayout({
	children
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<section className="flex">
			<aside className="flex-col items-center w-1/3 lg:w-1/4">
				<Button as={Link} color="primary" href="/game/chess">
					Chess Game
				</Button>
			</aside>
			<main>{children}</main>
		</section>
	);
}
