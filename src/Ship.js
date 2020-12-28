class Ship {
	size = null;
	direction = null;
	killed = false;

	x = null;
	y = null;

	get placed() {
		return this.x !== null && this.y !== null;
	}

	constructor(size, direction) {
		this.size = size;
		this.direction = direction;
	}
}
