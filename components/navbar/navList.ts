class Url {
	constructor(public name: string, public url: string) {}
}

export const menuI = [
	new Url('Game', '/game'),
	new Url('About', '/about'),
	new Url('User', '/userPage')
];

//export const menuURL = ['/game', '/about', '/userPage'];
