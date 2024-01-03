import {BoardModel} from '@/lib/game/boardModel'
import {Point} from '@/lib/game/point'
import {SquareModel} from '@/lib/game/squareModel'

export enum SquareColour {
	Black,
	White,
	Selected,
	CanMove,
	Move,
}
export enum AvailableType {
	Unavailable = 0,
	Available = 1,
	OccupiedByEnemy = 2,
}

export enum Player {
	One,
	Two,
}

export type callbackHandler<T> = (
	value: SquareModel[],
	index: number,
	array: SquareModel[][]
) => T

export type validMovesFunction = (
	board: BoardModel,
	p: Point,
	moves: Point[]
) => Point[]
