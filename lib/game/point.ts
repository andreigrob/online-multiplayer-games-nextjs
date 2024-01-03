export class Point {
	constructor(public x?: number, public y?: number) {}
	equals(p: Point): boolean {
		if (p == undefined) return false
		return this.x === p.x && this.y === p.y
	}
}
