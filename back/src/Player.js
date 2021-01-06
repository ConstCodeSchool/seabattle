const Battlefield = require("./Battlefield");

module.exports = class Player {
	battlefield = new Battlefield();
	socket = null;
	party = null;

	get ready() {
		return this.battlefield.complete && !this.party && this.socket;
	}

	constructor(socket) {
		this.socket = socket;
	}

	on(...args) {
		if (this.socket && this.socket.connected) {
			this.socket.on(...args);
		}
	}

	emit(...args) {
		if (this.socket && this.socket.connected) {
			this.socket.emit(...args);
		}
	}
};
