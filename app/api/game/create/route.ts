import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { chessBoard } from '@/components/chess/chess';

const prisma = new PrismaClient();

async function createGame(player1: string, player2: string, gameType: number) {
	let currentTime = new Date();
	await prisma.game.create({
		data: {
			player1: player1,
			player2: player2,
			gameType: gameType,
			started: currentTime
		}
	});
	let createdGame1 = await prisma.game.findFirst({
		where: {
			AND: {
				player1: player1,
				player2: player2,
				gameType: gameType,
				started: currentTime
			}
		}
	});
	if (createdGame1?.id) {
		if (gameType == 1) {
			// chess
			await prisma.boards.create({
				data: {
					id: createdGame1.id,
					turn: 1,
					board: JSON.stringify(chessBoard)
				}
			});
		}
	}
}

export async function POST(request: NextRequest) {
	const { player1, player2, gameType } = await request.json();

	return await createGame(player1, player2, Number.parseInt(gameType))
		.then(async () => {
			await prisma.$disconnect();
			return NextResponse.json(
				{ message: 'Game created' },
				{ status: 200 }
			);
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			return NextResponse.json(
				{ message: 'Game not created' },
				{ status: 400 }
			);
		});
}
