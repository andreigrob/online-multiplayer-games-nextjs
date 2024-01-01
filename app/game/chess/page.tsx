import ChessBoard from '@/components/chess/Board'
import {chessBoard2} from '@/components/chess/chess'

export default function ChessPage(): React.JSX.Element {
	return (
		<div className="flex flex-col items-center">
			<ChessBoard pArray={chessBoard2} />
		</div>
	)
}
