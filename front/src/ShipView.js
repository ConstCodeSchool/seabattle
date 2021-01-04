class ShipView extends Ship {
	div = null;

	startX = null;
	startY = null;

	constructor(size, direction, startX, startY) {
		super(size, direction);

		const div = document.createElement("div");
		div.classList.add("ship");

		Object.assign(this, { div, startX, startY });

		this.setDirection(direction, true);
	}

	setDirection(newDirection, force = false) {
		if (!force && this.direction === newDirection) {
			return false;
		}

		this.div.classList.remove(`ship-${this.direction}-${this.size}`);
		this.direction = newDirection;
		this.div.classList.add(`ship-${this.direction}-${this.size}`);

		return true;
	}

	toggleDirection() {
		const newDirection = this.direction === "row" ? "column" : "row";
		this.setDirection(newDirection);
	}

	isUnder(point) {
		return isUnderPoint(point, this.div);
	}
}
