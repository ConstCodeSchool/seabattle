class Battlefield {
	ships = [];
	shots = [];

	addShip(ship) {
		if (this.ships.includes(ship)) {
			return false;
		}

		this.ships.push(ship);
		return true;
	}

	removeShip(ship) {
		if (!this.ships.includes(ship)) {
			return false;
		}

		const index = this.ships.indexOf(ship);
		this.ships.splice(index, 1);
		return true;
	}

	removeAllShips() {
		const ships = this.ships.slice();

		for (const ship of ships) {
			this.removeShip(ship);
		}

		return ships.length;
	}

	addShot() {}

	removeShot() {}

	removeAllShots() {
		const shots = this.shots.slice();

		for (const shot of shots) {
			this.removeShot(shot);
		}

		return shots.length;
	}
}
