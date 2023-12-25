import BoardSquare from './BoardSquare';
import { ChessSquareColor } from './BoardTypes';

export default function ChessBoard() {
	return (
		<div className="flex flex-col">
			{Array.from(Array(8).keys()).map((column) => {
				return (
					<div key={column} className="flex flex-row">
						{Array.from(Array(8).keys()).map((row) => {
							return (
								<BoardSquare
									color={
										(row + (column % 2)) % 2 == 0
											? ChessSquareColor.White
											: ChessSquareColor.Black
									}
									key={column * 8 + row}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
