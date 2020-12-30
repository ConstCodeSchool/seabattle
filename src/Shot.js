class Shot {
	x = null;
	y = null;
	variant = null;

	constructor(x, y, variant = "miss") {
		Object.assign(this, { x, y, variant });
	}

	setVariant(variant) {
		this.variant = variant;
	}
}
