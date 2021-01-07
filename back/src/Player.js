const Battlefield = require("./Battlefield");

module.exports = class Player {
	battlefield = new Battlefield();
	socket = null;
	party = null;
	sessionId = null;

	get ready() {
		return this.battlefield.complete && !this.party && this.socket;
	}

	constructor(socket, sessionId) {
		Object.assign(this, { socket, sessionId });
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
