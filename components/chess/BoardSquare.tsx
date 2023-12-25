import { ChessSquareColor } from './BoardTypes';

export default function BoardSquare({ color }: { color: ChessSquareColor }) {
	let squareClass = 'w-20 h-20  ';
	if (color === ChessSquareColor.Black) {
		squareClass += 'bg-black';
	} else {
		squareClass += 'bg-white';
	}

	return <div className={squareClass}></div>;
}
