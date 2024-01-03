import { SquareColour } from "@/lib/game/types";

export class SquareModel {
	constructor(public piece = '', public colour = SquareColour.Black) {}
}