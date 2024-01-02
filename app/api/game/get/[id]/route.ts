import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/app/api/lib'
async function getGame(id: number) {
	return await prisma.boards.findUnique({
		where: {
			id: id,
		},
	})
}

export async function GET(
	request: NextRequest,
	{params}: {params: {id: string}}
) {
	//const { searchParams } = new URL(request.url);
	const gameId = Number.parseInt(params.id)

	return await getGame(gameId)
		.then(async (gameBoard) => {
			return NextResponse.json(
				{turn: gameBoard?.turn, board: gameBoard?.board},
				{
					status: 200,
				}
			)
		})
		.catch(async (e) => {
			console.error(e)
			return NextResponse.json(
				{message: 'Error updating user availability.'},
				{status: 400}
			)
		})
		.finally(async () => {
			await prisma.$disconnect()
			console.log('Yo')
		})
}
