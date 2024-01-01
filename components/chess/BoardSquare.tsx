'use client'
import {ChessBoardContext, Point, np} from './Board'
import Image from 'next/image'
import {SquareColour} from './BoardTypes'
import {useContext} from 'react'
import {isPiece, isPlayerPiece} from '@/util/chess'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'
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
	let c = useContext(ChessBoardContext)
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
	function onclickF(e: any) {
		switch (c.click) {
			case 0:
				if (isPlayerPiece(c.player!, text)) {
					c.setSquare(new Point(x, y))
					c.setMoveSquare(np)
					c.setClick(1)
				}
				break
			case 1:
				c.setSquare2(new Point(x, y))
				console.log('_______x: ' + x + ',' + y)
				c.setClick(2)
				break
		}
	}
	return (
		<div
			className={squareClass}
			onClick={onclickF}
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
