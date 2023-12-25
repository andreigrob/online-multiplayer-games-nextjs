import { Button } from '@nextui-org/react';
import Link from 'next/link';

function Game() {
	return (
		<>
			<Button as={Link} color="primary" href="/game/chess">
				Chess Game
			</Button>
		</>
	);
}

export default Game;
