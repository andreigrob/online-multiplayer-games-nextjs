import {isEmpty} from '@/lib/game/boardUtils'
import {Point} from '@/lib/game/point'
import {SquareModel} from '@/lib/game/squareModel'
import {AvailableType, SquareColour, callbackHandler} from '@/lib/game/types'

export class BoardModel {
	private board = new Array<Array<SquareModel>>(0)
	constructor(public xSize: number, public ySize: number) {}
	get(p: Point | undefined): SquareModel | undefined {
		if (p !== undefined && p.y !== undefined && p.x !== undefined) {
			return this.board[p.y][p.x]
		}
		return undefined
	}
	setPiece(p: Point, piece: string): void {
		if (p !== undefined) {
			this.board[p.y!][p.x!].piece = piece
		}
	}
	setBoard(board: string[][]) {
		this.board = board.map((row, y) => {
			return row.map((square, x) => {
				const colour =
					(x + y) % 2 == 0 ? SquareColour.White : SquareColour.Black
				return new SquareModel(square, colour)
			})
		})
	}
	isOnBoard(p: Point): boolean {
		return (
			p !== undefined &&
			p.x! >= 0 &&
			p.x! < this.xSize &&
			p.y! >= 0 &&
			p.y! < this.ySize
		)
	}
	isEmpty(p: Point): boolean {
		return p !== undefined && isEmpty(this.get(p)!.piece)
	}

	isAvailable(p: Point, pieceP: Point): AvailableType {
		if (p === undefined || pieceP === undefined)
			return AvailableType.Unavailable
		if (!this.isOnBoard(p)) return AvailableType.Unavailable
		return AvailableType.Available
	}
	check(p2: Point, pieceP: Point, moves: Point[]): AvailableType {
		let n: AvailableType
		if ((n = this.isAvailable(p2, pieceP))) {
			moves.push(p2)
		}
		return n
	}

	setColour(p: Point | undefined, colour: SquareColour): void {
		const point = this.get(p)
		point !== undefined && (point.colour = colour)
	}
	markCanMove(p: Point | undefined): void {
		this.setColour(p, SquareColour.CanMove)
	}
	markMove(p: Point | undefined): void {
		this.setColour(p, SquareColour.Move)
	}
	markSelected(p: Point | undefined): void {
		this.setColour(p, SquareColour.Selected)
	}
	map<T>(f: callbackHandler<T>): T[] {
		return this.board.map(f)
	}
}
