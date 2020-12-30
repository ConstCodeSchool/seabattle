class ShotView extends Shot {
	div = null;

	constructor(x, y, variant = "miss") {
		super(x, y, variant);

		const div = document.createElement("div");
		div.classList.add("shot");

		this.div = div;
		this.setVariant(variant, true);
	}

	setVariant(variant, force = false) {
		if (!force && this.variant === variant) {
			return false;
		}

		this.variant = variant;

		this.div.classList.remove("shot-missed", "shot-wounded", "shot-killed");
		this.div.textContent = "";

		if (this.variant === "miss") {
			this.div.classList.add("shot-missed");
			this.div.textContent = "•";
		} else if (this.variant === "wounded") {
			this.div.classList.add("shot-wounded");
		} else if (this.variant === "killed") {
			this.div.classList.add("shot-wounded", "shot-killed");
		}

		return true;
	}
}
