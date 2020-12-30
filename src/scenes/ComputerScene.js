class ComputerScene extends Scene {
	untouchables = [];
	playerTurn = true;
	status = null;
	removeEventListeners = [];

	init() {
		this.status = document.querySelector(".battlefield-status");
	}

	start(untouchables) {
		const { opponent } = this.app;

		document
			.querySelectorAll(".app-actions")
			.forEach((element) => element.classList.add("hidden"));

		document
			.querySelector('[data-scene="computer"]')
			.classList.remove("hidden");

		opponent.clear();
		opponent.randomize(ShipView);

		this.untouchables = untouchables;

		this.removeEventListeners = [];

		const gaveupButton = document.querySelector('[data-action="gaveup"]');
		const againButton = document.querySelector('[data-action="again"]');

		gaveupButton.classList.remove("hidden");
		againButton.classList.add("hidden");

		this.removeEventListeners.push(
			addEventListener(gaveupButton, "click", () => {
				this.app.start("preparation");
			})
		);

		this.removeEventListeners.push(
			addEventListener(againButton, "click", () => {
				this.app.start("preparation");
			})
		);
	}

	stop() {
		for (const removeEventListener of this.removeEventListeners) {
			removeEventListener();
		}

		this.removeEventListeners = [];
	}

	update() {
		const { mouse, opponent, player } = this.app;

		const isEnd = opponent.loser || player.loser;

		const cells = opponent.cells.flat();
		cells.forEach((cell) => cell.classList.remove("battlefield-item__active"));

		if (isEnd) {
			if (opponent.loser) {
				this.status.textContent = "Вы выиграли!";
			} else {
				this.status.textContent = "Вы проиграли ((";
			}

			document.querySelector('[data-action="gaveup"]').classList.add("hidden");

			document
				.querySelector('[data-action="again"]')
				.classList.remove("hidden");

			return;
		}

		if (isUnderPoint(mouse, opponent.table)) {
			const cell = cells.find((cell) => isUnderPoint(mouse, cell));

			if (cell) {
				cell.classList.add("battlefield-item__active");

				if (this.playerTurn && mouse.left && !mouse.pLeft) {
					const x = parseInt(cell.dataset.x);
					const y = parseInt(cell.dataset.y);

					const shot = new ShotView(x, y);
					const result = opponent.addShot(shot);

					if (result) {
						this.playerTurn = shot.variant === "miss" ? false : true;
					}
				}
			}
		}

		if (!this.playerTurn) {
			const x = getRandomBetween(0, 9);
			const y = getRandomBetween(0, 9);

			let inUntouchable = false;

			for (const item of this.untouchables) {
				if (item.x === x && item.y === y) {
					inUntouchable = true;
					break;
				}
			}

			if (!inUntouchable) {
				const shot = new ShotView(x, y);
				const result = player.addShot(shot);

				if (result) {
					this.playerTurn = shot.variant === "miss" ? true : false;
				}
			}
		}

		if (this.playerTurn) {
			this.status.textContent = "Ваш ход:";
		} else {
			this.status.textContent = "Ход комьютера:";
		}
	}
}
