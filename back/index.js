// Зависимости
const session = require("express-session");
const express = require("express");

const PartyManager = require("./src/PartyManager");
const pm = new PartyManager();

// Создание приложения ExpressJS
const app = express();
const http = require("http").createServer(app);

// Регистраци Socket приложения
const io = require("socket.io")(http);
const port = 3000;

// Настройка сессий
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "s3Cur3",
		name: "sessionId",
	})
);

// Настройка статики
app.use(express.static("./../front/"));

// Поднятие сервера
http.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

// Прослушивание socket соединений
io.on("connection", (socket) => {
	pm.connection(socket);
	io.emit("playerCount", io.engine.clientsCount);

	// Отключение коннекта
	socket.on("disconnect", () => {
		pm.disconnect(socket);
		io.emit("playerCount", io.engine.clientsCount);
	});

	// // Поиск случайного соперника
	// socket.on("findRandomOpponent", () => {
	// 	socket.emit("statusChange", "randomFinding");

	// 	pm.playRandom(socket);
	// });
});
