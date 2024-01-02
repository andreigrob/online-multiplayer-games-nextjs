import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/app/api/lib'

async function listAvailableUsers(gameType: number) {
	return await prisma.availableUsers.findMany({
		where: {
			AND: {
				gameType: gameType,
				available: {gte: new Date(Date.now())},
			},
		},
	})
}

export async function GET(
	request: NextRequest,
	{params}: {params: {id: string}}
) {
	//const { searchParams } = new URL(request.url);
	const gameType = Number.parseInt(params.id)
	console.log(gameType)

	return await listAvailableUsers(gameType)
		.then(async (availableUsers) => {
			console.log(availableUsers)
			return NextResponse.json(
				{message: 'User available.'},
				{status: 200}
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
