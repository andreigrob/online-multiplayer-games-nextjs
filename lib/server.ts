import {cookies} from 'next/headers'

import FetchWrapper from './fetchWrapper'

export const useSession: SessionManager = {
	getCookie,
	setCookie,
	removeCookie,
}

function getCookie(key: string): string | undefined {
	return cookies().get(key)?.value
}

function setCookie(key: string, value: string): void {
	cookies().set(key, value)
}

function removeCookie(key: string): void {
	setCookie(key, '')
}

const serverFetch = new FetchWrapper('http://localhost:8000', useSession)
const serverData = new DataWrapper(serverFetch)

export default serverData
