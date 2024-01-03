type RequestHeaders = {[key: string]: string}

type RequestBody = Record<string, unknown>

interface RequestOptions {
	method: string
	headers: RequestHeaders
	body?: string
}

// new FetchWrapper("", useSession())

class FetchWrapper {
	baseUrl: string
    useSession: Promise<any>

	constructor(baseUrl: string, useSession: Promise<any>) {
		this.baseUrl = baseUrl
        this.useSession = useSession
	}

	async post(
		url: string,
		body: RequestBody,
		auth_token?: string
	): Promise<any> {
		url = this.baseUrl + url
		const requestOptions: RequestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...this.authHeader(auth_token),
			},
			body: JSON.stringify(body),
		}

		return await fetch(url, requestOptions).then((response) =>
			this.handleResponse(response)
		)
	}

	async get(url: string, auth_token?: string): Promise<any> {
		url = this.baseUrl + url
		const requestOptions: RequestOptions = {
			method: 'GET',
			headers: this.authHeader(auth_token),
		}

		return await fetch(url, requestOptions).then((response) =>
			this.handleResponse(response)
		)
	}

	async put(url: string, body: RequestBody): Promise<any> {
		url = this.baseUrl + url
		const requestOptions: RequestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...this.authHeader(url),
			},
			body: JSON.stringify(body),
		}
		return await fetch(url, requestOptions).then((response) =>
			this.handleResponse(response)
		)
	}

	async _delete(url: string, auth_token?: string): Promise<any> {
		url = this.baseUrl + url
		const requestOptions: RequestOptions = {
			method: 'DELETE',
			headers: this.authHeader(auth_token),
		}
		return await fetch(url, requestOptions).then((response) =>
			this.handleResponse(response)
		)
	}

	authHeader(auth_token?: string): RequestHeaders {
		const user = 

		const isLoggedIn = user && user.token
		if (isLoggedIn || auth_token) {
			return {Authorization: `Token ${user?.token || auth_token}`}
		} else {
			return {}
		}
	}

	async handleResponse(response: Response): Promise<any> {
		return new Promise(async (resolve, reject) => {
			const text = await response.text()
			let data = text && JSON.parse(text)
			const user = useUser[0]
			const logout = useUser[2]

			if (!response.ok) {
				if ([401, 403].includes(response.status) && user) {
					logout()
				}
				data.status = response.status
				reject(data)
			}

			if (!data || typeof data !== 'object') {
				data = {}
			}

			resolve(data)
		})
	}
}

export default FetchWrapper
