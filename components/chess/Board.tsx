'use client'
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react'
import BoardSquare from './BoardSquare'
import {isPlayerPiece} from '@/lib/game/boardUtils'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'
import pawnBlack from '@/public/chessImg/P.svg'
import pawnWhite from '@/public/chessImg/p_w.svg'
import knightBlack from '@/public/chessImg/N.svg'
import knightWhite from '@/public/chessImg/n_w.svg'
import bishopBlack from '@/public/chessImg/B.svg'
import bishopWhite from '@/public/chessImg/b_w.svg'
import rookBlack from '@/public/chessImg/R.svg'
import rookWhite from '@/public/chessImg/r_w.svg'
import queenBlack from '@/public/chessImg/Q.svg'
import queenWhite from '@/public/chessImg/q_w.svg'
import kingBlack from '@/public/chessImg/K.svg'
import kingWhite from '@/public/chessImg/k_w.svg'
import {Button} from '@nextui-org/react'
import {Point} from '@/lib/game/point'
import {ChessBoardModel} from '@/lib/game/chess/chessBoardModel'
import {Player} from '@/lib/game/types'

const pieceImageArray: [string, StaticImport][] = [
	['P', pawnBlack],
	['p', pawnWhite],
	['N', knightBlack],
	['n', knightWhite],
	['B', bishopBlack],
	['b', bishopWhite],
	['R', rookBlack],
	['r', rookWhite],
	['Q', queenBlack],
	['q', queenWhite],
	['K', kingBlack],
	['k', kingWhite],
]
const chessImages = new Map<string, StaticImport>(pieceImageArray)

function nullFunction() {}
class ContextClass {
	constructor(
		public square?: Point,
		public setSquare: Dispatch<
			SetStateAction<Point | undefined>
		> = nullFunction,
		public square2?: Point,
		public setSquare2: Dispatch<
			SetStateAction<Point | undefined>
		> = nullFunction,
		public moveSquare?: Point,
		public setMoveSquare: Dispatch<
			SetStateAction<Point | undefined>
		> = nullFunction,
		public player = Player.One,
		public click = 0,
		public setClick: Dispatch<SetStateAction<number>> = nullFunction
	) {}
}
export const ChessBoardContext = createContext(new ContextClass())

const chessBoardModel = new ChessBoardModel()
let n = 0
export default function ChessBoard({
	chessArray,
}: {
	chessArray: string[][]
}): React.JSX.Element {
	++n
	console.log('** ' + n)
	const [square, setSquare] = useState<Point>()
	const [square2, setSquare2] = useState<Point>()
	const [moveSquare, setMoveSquare] = useState<Point>()
	const [player, setPlayer] = useState(Player.One)
	const [click, setClick] = useState(0)
	console.log('click: ' + click)

	chessBoardModel.setBoard(chessArray)
	chessBoardModel.markSelected(square)
	const moves = chessBoardModel.moves(square)
	moves.forEach((p) => {
		chessBoardModel.markCanMove(p)
	})
	chessBoardModel.markMove(moveSquare)

	function nextPlayer() {
		if (player === Player.One) {
			setPlayer(Player.Two)
		} else {
			setPlayer(Player.One)
		}
	}

	useEffect(() => {
		if (click == 2) {
			console.log('square2: ' + square2?.x + ',' + square2?.y)
			if (isPlayerPiece(player, chessBoardModel.get(square2)?.piece)) {
				setSquare(square2)
			} else {
				const found = moves.findIndex((p) => {
					console.log('p: ' + p?.x + ',' + p?.y)
					return square2?.equals(p)
				})
				console.log('Found: ' + found)
				if (found != -1) {
					setMoveSquare(square2)
					nextPlayer()
				} else {
					setSquare(undefined)
				}
			}
			setClick(0)
		}
	}, [click])

	function clickFunc(event: React.MouseEvent<HTMLElement>) {
		event
		console.log('Hello')
		nextPlayer()
	}
	return (
		<ChessBoardContext.Provider
			value={
				new ContextClass(
					square,
					setSquare,
					square2,
					setSquare2,
					moveSquare,
					setMoveSquare,
					player,
					click,
					setClick
				)
			}
		>
			<div className="flex flex-col">
				{chessBoardModel.map((row, y) => {
					return (
						<div
							key={y}
							className="flex flex-row"
						>
							{row.map((square, x) => {
								return (
									<BoardSquare
										text={square.piece}
										x={x}
										y={y}
										key={y * 8 + x}
										colour={square.colour}
										img={chessImages.get(square.piece)}
									/>
								)
							})}
						</div>
					)
				})}
				<p>{JSON.stringify(square)}</p>
				<p>Player {player ? '2' : '1'}</p>
				<p>{JSON.stringify(square2)}</p>
				<Button onClick={clickFunc}>Hello</Button>
			</div>
		</ChessBoardContext.Provider>
	)
}
