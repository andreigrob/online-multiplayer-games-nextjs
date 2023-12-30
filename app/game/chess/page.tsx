import ChessBoard from '@/components/chess/Board';
import { chessBoard } from '@/components/chess/chess';

export default function ChessPage() {
	return (
		<div className="flex flex-col items-center">
			<ChessBoard pieces={chessBoard} />
		</div>
	);
}
