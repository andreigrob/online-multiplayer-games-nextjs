'use client';
import { ChessSquareColor } from './BoardTypes';

export default function BoardSquare({
	color,
	text
}: {
	color: ChessSquareColor;
	text: string;
}) {
	let squareClass = 'w-20 h-20  ';
	if (color === ChessSquareColor.Black) {
		squareClass += 'bg-black text-white';
	} else {
		squareClass += 'bg-white text-black';
	}
	let onclickF = function (e: any) {};
	if (text != '') {
		onclickF = function (e: any) {
			alert(text);
		};
	}
	return (
		<div className={squareClass} onClick={onclickF}>
			{text}
		</div>
	);
}
