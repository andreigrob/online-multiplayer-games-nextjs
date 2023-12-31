import {BoardModel} from '@/lib/game/boardModel'
import {isLower, isOther} from '@/lib/game/boardUtils'
import {ChessPiece} from '@/lib/game/chess/chessTypes'
import {Point} from '@/lib/game/point'
import {AvailableType, u, ud, validMovesFunction} from '@/lib/game/types'

const chessSize = 8

export class ChessBoardModel extends BoardModel {
	constructor() {
		super(chessSize, chessSize)
	}
	isAvailable(p: Point, pieceP: Point): AvailableType {
		if (super.isAvailable(p, pieceP) === AvailableType.Unavailable) {
			return AvailableType.Unavailable
		}
		const square = this.get(pieceP)
		if (square === ud) {
			return AvailableType.Unavailable
		}
		const piece = square.piece
		const pieceL = piece.toLowerCase()
		if (
			this.isEmpty(p) &&
			(pieceL !== ChessPiece.Pawn || p.x === pieceP.x)
		) {
			return AvailableType.Available
		}
		let advance = true
		if (pieceL === ChessPiece.Pawn) {
			advance = p.x !== pieceP.x
		}
		return advance && isOther(this.get(p)!.piece, piece)
			? AvailableType.OccupiedByEnemy
			: AvailableType.Unavailable
	}
	moves(p: Point | u): Point[] {
		if (p === ud) return []
		const piece = this.get(p)!.piece
		const pieceL = piece.toLowerCase()
		let moves = new Array<Point>(0)
		switch (pieceL) {
			case ChessPiece.Pawn:
				moves = new Array<Point>(5)
				this.pawnValidMoves(this, p, moves)
				break
			case ChessPiece.Knight:
				moves = new Array<Point>(8)
				this.knightValidMoves(this, p, moves)
				break
			case ChessPiece.Bishop:
				moves = new Array<Point>(12)
				this.bishopValidMoves(this, p, moves)
				break
			case ChessPiece.Rook:
				moves = new Array<Point>(10)
				this.rookValidMoves(this, p, moves)
				break
			case ChessPiece.Queen:
				moves = new Array<Point>(21)
				this.queenValidMoves(this, p, moves)
				break
			case ChessPiece.King:
				moves = new Array<Point>(8)
				this.kingValidMoves(this, p, moves)
				break
		}
		return moves
	}

	pawnValidMoves: validMovesFunction = (board, p, moves) => {
		if (p === ud) return []
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
		if (this.check(newP1, p, moves) && y === startY) {
			const newP2 = new Point(x, y + 2 * deltaY)
			this.check(newP2, p, moves)
		}
		const newP3 = new Point(x - 1, newY)
		this.check(newP3, p, moves)
		const newP4 = new Point(x + 1, newY)
		this.check(newP4, p, moves)
		return moves
	}
	knightValidMoves: validMovesFunction = (board, p, moves) => {
		if (p === ud) return []
		const x = p.x!,
			y = p.y!
		const knight = (deltaX: number, deltaY: number): void => {
			const newP1 = new Point(x + deltaX, y + deltaY)
			this.check(newP1, p, moves)
			const newP2 = new Point(x + deltaX, y - deltaY)
			this.check(newP2, p, moves)
			const newP3 = new Point(x - deltaX, y + deltaY)
			this.check(newP3, p, moves)
			const newP4 = new Point(x - deltaX, y - deltaY)
			this.check(newP4, p, moves)
		}
		const directions = [
			[1, 2],
			[2, 1],
		]
		directions.forEach(([x, y]) => {
			knight(x, y)
		})
		return moves
	}

	// Function for queen, bishop and rook
	travel(
		directionX: number,
		directionY: number,
		p: Point,
		moves: Point[]
	): void {
		if (p.x == ud || p.y == ud) {
			return
		}
		const x = p.x,
			y = p.y
		for (let delta = 1; ; ++delta) {
			const newX = x + directionX * delta,
				newY = y + directionY * delta
			const newP = new Point(newX, newY)
			if (this.check(newP, p, moves) != AvailableType.Available) {
				break
			}
		}
	}
	bishopValidMoves: validMovesFunction = (board, p, moves) => {
		if (p === ud) {
			return []
		}
		const directions = [
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
		]
		directions.forEach(([x, y]) => {
			this.travel(x, y, p, moves)
		})
		return moves
	}
	rookValidMoves: validMovesFunction = (board, p, moves) => {
		if (p === ud) {
			return []
		}
		const directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		]
		directions.forEach(([x, y]) => {
			this.travel(x, y, p, moves)
		})
		return moves
	}
	queenValidMoves: validMovesFunction = (board, p, moves) => {
		this.bishopValidMoves(board, p, moves)
		this.rookValidMoves(board, p, moves)
		return moves
	}
	kingValidMoves: validMovesFunction = (board, p, moves) => {
		if (p === ud || p.x == ud || p.y == ud) return []
		const x = p.x,
			y = p.y
		for (let newY = y - 1; newY <= y + 1; ++newY) {
			for (let newX = x - 1; newX <= x + 1; ++newX) {
				const newP = new Point(newX, newY)
				this.check(newP, p, moves)
			}
		}
		return moves
	}
}
