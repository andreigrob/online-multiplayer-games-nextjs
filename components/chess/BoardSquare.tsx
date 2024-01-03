'use client'
import {ChessBoardContext} from './Board'
import Image from 'next/image'
import {useContext} from 'react'
import {isPlayerPiece} from '@/lib/game/boardUtils'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'
import {SquareColour} from '@/lib/game/types'
import {Point} from '@/lib/game/point'
export default function BoardSquare({
	x,
	y,
	colour,
	text,
	img,
}: {
	x: number
	y: number
	colour: SquareColour
	text: string
	img: StaticImport | undefined
}): React.JSX.Element {
	const context = useContext(ChessBoardContext)
	let squareClass =
		'w-20 h-20 border-gray-800 item-center justify-center border '
	if (x == 0) {
		squareClass += 'border-l-2 '
	} else if (x == 7) {
		squareClass += 'border-r-2 '
	}
	if (y == 0) {
		squareClass += 'border-t-2 '
	} else if (y == 7) {
		squareClass += 'border-b-2 '
	}
	switch (colour) {
		case SquareColour.Black:
			squareClass += 'bg-gray-500 text-white'
			break
		case SquareColour.White:
			squareClass += 'bg-white text-black'
			break
		case SquareColour.Selected:
			squareClass += 'bg-yellow-300 text-black'
			break
		case SquareColour.CanMove:
			squareClass += 'bg-blue-100 text-black '
			break
		case SquareColour.Move:
			squareClass += 'bg-blue-300 text-black '
			break
	}
	function squareClickHandler(event: React.MouseEvent<HTMLElement>) {
		event
		switch (context.click) {
			case 0:
				if (isPlayerPiece(context.player!, text)) {
					context.setSquare(new Point(x, y))
					context.setMoveSquare(undefined)
					context.setClick(1)
				}
				break
			case 1:
				context.setSquare2(new Point(x, y))
				console.log('_______x: ' + x + ',' + y)
				context.setClick(2)
				break
		}
	}
	return (
		<div
			className={squareClass}
			onClick={squareClickHandler}
		>
			{img ? (
				<Image
					src={img}
					width={75}
					alt={text}
					className="justify-center ml-0"
				/>
			) : (
				<></>
			)}
		</div>
	)
}
