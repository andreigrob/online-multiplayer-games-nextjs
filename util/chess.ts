import {Player} from '@/components/chess/BoardTypes'

export function isPlayerPiece(player: Player, piece: string): boolean {
	if (player === Player.One) {
		return isLower(piece)
	} else {
		return isUpper(piece)
	}
}

export function isEmpty(piece: string): boolean {
	return piece === ' '
}
export function isPiece(piece: string): boolean {
	return !isEmpty(piece)
}
export function isLower(str: string): boolean {
	return str >= 'a' && str <= 'z'
}
export function isUpper(str: string): boolean {
	return str >= 'A' && str <= 'Z'
}

export function isOther(piece1: string, piece2: string) {
	console.log('piece1:' + piece1 + ' piece2:' + piece2)
	return (
		(isLower(piece1) && isUpper(piece2)) ||
		(isUpper(piece1) && isLower(piece2))
	)
}
