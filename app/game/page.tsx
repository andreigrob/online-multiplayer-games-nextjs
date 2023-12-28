import { Button } from '@nextui-org/react';
import Link from 'next/link';

function Game() {
	return (
		<div className="flex flex-col items-center">
			<Button as={Link} color="primary" href="/game/chess">
				Chess Game
			</Button>
		</div>
	);
}

export default Game;
