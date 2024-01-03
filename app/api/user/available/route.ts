import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/app/api/lib'

async function createGame(id: string, gameType: number) {
	const timeAvailable = 60 * 1000
	const currentTime = new Date(Date.now() + timeAvailable)
	await prisma.availableUsers.upsert({
		where: {
			id: id,
			gameType: gameType,
		},
		update: {
			available: currentTime,
		},
		create: {id: id, available: currentTime, gameType: gameType},
	})
}

export async function POST(request: NextRequest) {
	const {id, gameType} = await request.json()

	return await createGame(id, gameType)
		.then(async () => {
			await prisma.$disconnect()
			return NextResponse.json(
				{message: 'User available.'},
				{status: 200}
			)
		})
		.catch(async (e) => {
			console.error(e)
			await prisma.$disconnect()
			return NextResponse.json(
				{message: 'Error updating user availability.'},
				{status: 400}
			)
		})
}
