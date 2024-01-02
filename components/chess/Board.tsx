'use client'
import {Dispatch, SetStateAction, createContext, useState} from 'react'
import BoardSquare from './BoardSquare'
import {ChessE, SquareColour, Player} from './BoardTypes'
import {isEmpty, isLower, isOther, isPlayerPiece} from '@/util/chess'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'
import pawnB from '@/public/chessImg/P.svg'
import pawnW from '@/public/chessImg/p_w.svg'
import knightB from '@/public/chessImg/N.svg'
import knightW from '@/public/chessImg/n_w.svg'
import bishopB from '@/public/chessImg/B.svg'
import bishopW from '@/public/chessImg/b_w.svg'
import rookB from '@/public/chessImg/R.svg'
import rookW from '@/public/chessImg/r_w.svg'
import queenB from '@/public/chessImg/Q.svg'
import queenW from '@/public/chessImg/q_w.svg'
import kingB from '@/public/chessImg/K.svg'
import kingW from '@/public/chessImg/k_w.svg'
import {Button} from '@nextui-org/react'

const imgA: [string, StaticImport][] = [
	['P', pawnB],
	['p', pawnW],
	['N', knightB],
	['n', knightW],
	['B', bishopB],
	['b', bishopW],
	['R', rookB],
	['r', rookW],
	['Q', queenB],
	['q', queenW],
	['K', kingB],
	['k', kingW],
]
const chessImages = new Map<string, StaticImport>(imgA)
export class Point {
	constructor(public x?: int, public y?: int) {}
	isDefined(): boolean {
		return this.x !== undefined && this.y !== undefined
	}
	equals(p: Point): boolean {
		if (p == undefined) return false
		return this.x === p.x && this.y === p.y
	}
}
const chessSize = 8
class SquareM {
	constructor(public piece = '', public colour = SquareColour.Black) {}
}
class BoardM {
	private board = new Array<Array<SquareM>>(0)
	constructor(public xSize: number, public ySize: number) {}
	get(p: Point): SquareM | undefined {
		if (p.isDefined()) {
			return this.board[p.y!][p.x!]
		}
	}
	setPiece(p: Point, piece: string): void {
		p.isDefined() && (this.board[p.y!][p.x!].piece = piece)
	}
	setBoard(board: string[][]) {
		this.board = board.map((row, y) => {
			return row.map((square, x) => {
				const colour =
					(x + y) % 2 == 0 ? SquareColour.White : SquareColour.Black
				return new SquareM(square, colour)
			})
		})
	}
	isOnBoard(p: Point): boolean {
		return (
			p.isDefined() &&
			p.x! >= 0 &&
			p.x! < this.xSize &&
			p.y! >= 0 &&
			p.y! < this.ySize
		)
	}
	isEmpty(p: Point): boolean {
		return p.isDefined() && isEmpty(this.get(p)!.piece)
	}
	isAvailable(p: Point, pieceP: Point): int {
		if (!p.isDefined() || !pieceP.isDefined()) return 0
		if (!this.isOnBoard(p)) return 0
		const piece = this.get(pieceP)!.piece
		const pieceL = piece.toLowerCase()
		if (this.isEmpty(p) && (pieceL !== ChessE.Pawn || p.x === pieceP.x)) {
			return 1
		}
		let advance = true
		if (pieceL === ChessE.Pawn) {
			advance = p.x !== pieceP.x
		}
		return advance && isOther(this.get(p)!.piece, piece) ? 2 : 0
	}
	setColour(p: Point, colour: SquareColour): void {
		p.isDefined() && (this.get(p)!.colour = colour)
	}
	markCanMove(p: Point): void {
		this.setColour(p, SquareColour.CanMove)
	}
	markMove(p: Point): void {
		this.setColour(p, SquareColour.Move)
	}
	markSelected(p: Point): void {
		this.setColour(p, SquareColour.Selected)
	}
	map(f: callbackFunc) {
		return this.board.map(f)
	}
}

type callbackFunc = (value: SquareM[], index: number, array: SquareM[][]) => any
class ChessBoardM extends BoardM {
	constructor() {
		super(chessSize, chessSize)
	}
	moves(p: Point): Point[] {
		if (!p.isDefined()) return []
		const piece = this.get(p)!.piece
		const pieceL = piece.toLowerCase()
		let moves = new Array<Point>(0)
		switch (pieceL) {
			case ChessE.Pawn:
				moves = new Array<Point>(5)
				pawnMoves(this, p, moves)
				break
			case ChessE.Knight:
				moves = new Array<Point>(8)
				knightMoves(this, p, moves)
				break
			case ChessE.Bishop:
				moves = new Array<Point>(12)
				bishopMoves(this, p, moves)
				break
			case ChessE.Rook:
				moves = new Array<Point>(10)
				rookMoves(this, p, moves)
				break
			case ChessE.Queen:
				moves = new Array<Point>(21)
				queenMoves(this, p, moves)
				break
			case ChessE.King:
				moves = new Array<Point>(8)
				kingMoves(this, p, moves)
				break
		}
		return moves
	}
}

type int = number
type Int = number | undefined
type moveF = (board: BoardM, p: Point, moves: Point[]) => Point[]

function check(p2: Point, pieceP: Point, board: BoardM, moves: Point[]): int {
	let n: int
	if ((n = board.isAvailable(p2, pieceP))) {
		moves.push(p2)
	}
	return n
}

const pawnMoves: moveF = (board, p, moves) => {
	if (!p.isDefined()) return []
	const piece = board.get(p)!.piece
	let deltaY = 1
	let startY = 1
	if (isLower(piece)) {
		deltaY = -1
		startY = 6
	}
	const x = p.x!,
		y = p.y!
	const newY = y + deltaY
	const newP1 = new Point(x, newY)
	if (check(newP1, p, board, moves) && y === startY) {
		const newP2 = new Point(x, y + 2 * deltaY)
		check(newP2, p, board, moves)
	}
	const newP3 = new Point(x - 1, newY)
	check(newP3, p, board, moves)
	const newP4 = new Point(x + 1, newY)
	check(newP4, p, board, moves)
	return moves
}
const knightMoves: moveF = (board, p, moves) => {
	if (!p.isDefined()) return []
	const x = p.x!,
		y = p.y!
	function knight(deltaX: int, deltaY: int): void {
		const newP1 = new Point(x + deltaX, y + deltaY)
		check(newP1, p, board, moves)
		const newP2 = new Point(x + deltaX, y - deltaY)
		check(newP2, p, board, moves)
		const newP3 = new Point(x - deltaX, y + deltaY)
		check(newP3, p, board, moves)
		const newP4 = new Point(x - deltaX, y - deltaY)
		check(newP4, p, board, moves)
	}
	knight(1, 2)
	knight(2, 1)
	return moves
}
function travel(
	directionX: int,
	directionY: int,
	p: Point,
	board: BoardM,
	moves: Point[]
): void {
	const x = p.x!,
		y = p.y!
	for (let delta = 1; ; ++delta) {
		const newX = x + directionX * delta,
			newY = y + directionY * delta
		const newP = new Point(newX, newY)
		if (check(newP, p, board, moves) != 1) {
			break
		}
	}
}
const bishopMoves: moveF = (board, p, moves) => {
	if (!p.isDefined()) return []
	travel(1, 1, p, board, moves)
	travel(1, -1, p, board, moves)
	travel(-1, 1, p, board, moves)
	travel(-1, -1, p, board, moves)
	return moves
}
const rookMoves: moveF = (board, p, moves) => {
	if (!p.isDefined()) return []
	travel(0, 1, p, board, moves)
	travel(0, -1, p, board, moves)
	travel(1, 0, p, board, moves)
	travel(-1, 0, p, board, moves)
	return moves
}
const queenMoves: moveF = (board, p, moves) => {
	bishopMoves(board, p, moves)
	rookMoves(board, p, moves)
	return moves
}
const kingMoves: moveF = (board, p, moves) => {
	if (!p.isDefined()) return []
	const x = p.x!,
		y = p.y!
	for (let newY = y - 1; newY <= y + 1; ++newY) {
		for (let newX = x - 1; newX <= x + 1; ++newX) {
			const newP = new Point(newX, newY)
			check(newP, p, board, moves)
		}
	}
	return moves
}

function nf() {}
class ContextClass {
	constructor(
		public square?: Point,
		public setSquare: Dispatch<SetStateAction<Point>> = nf,
		public square2?: Point,
		public setSquare2: Dispatch<SetStateAction<Point>> = nf,
		public moveSquare?: Point,
		public setMoveSquare: Dispatch<SetStateAction<Point>> = nf,
		public player = Player.One,
		public click = 0,
		public setClick: Dispatch<SetStateAction<int>> = nf
	) {}
}
export const ChessBoardContext = createContext(new ContextClass())

const cb = new ChessBoardM()
export const np = new Point()
let n = 0
export default function ChessBoard({
	pArray,
}: {
	pArray: string[][]
}): React.JSX.Element {
	++n
	console.log('** ' + n)
	cb.setBoard(pArray)
	const [square, setSquare] = useState(np)
	const [square2, setSquare2] = useState(np)
	const [moveSquare, setMoveSquare] = useState(np)
	const [player, setPlayer] = useState(Player.One)
	const [click, setClick] = useState(0)
	console.log('click: ' + click)
	cb.markSelected(square)
	const moves = cb.moves(square)
	moves.forEach((p) => {
		cb.markCanMove(p)
	})
	cb.markMove(moveSquare)
	function nextPlayer() {
		if (player === Player.One) {
			setPlayer(Player.Two)
		} else {
			setPlayer(Player.One)
		}
	}
	if (click == 2) {
		console.log('square2: ' + square2.x + ',' + square2.y)
		if (isPlayerPiece(player, cb.get(square2).piece)) {
			setSquare(square2)
		} else {
			const found = moves.findIndex((p) => {
				console.log('p: ' + p?.x + ',' + p?.y)
				return square2.equals(p)
			})
			console.log('Found: ' + found)
			if (found != -1) {
				setMoveSquare(square2)
				nextPlayer()
			} else {
				setSquare(np)
			}
		}
		setClick(0)
	}
	function clickFunc(a: any) {
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
				{cb.map((row, y) => {
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
