import ChessBoard from '@/components/chess/Board'
import {chessBoard2} from '@/components/chess/chess'

export default function ChessPage(): JSX.Element {
	return (
		<div className="flex flex-col items-center">
			<ChessBoard chessArray={chessBoard2} />
		</div>
	)
}
