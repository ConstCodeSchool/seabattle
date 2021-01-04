// Зависимости
const session = require("express-session");
const express = require("express");

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

// Массив ожидающих случайных играков
const waitingRandom = new Set();

// Прослушивание socket соединений
io.on("connection", (socket) => {
	io.emit("playerCount", io.engine.clientsCount);

	// Отключение коннекта
	socket.on("disconnect", () => {
		io.emit("playerCount", io.engine.clientsCount);

		if (waitingRandom.has(socket)) {
			waitingRandom.delete(socket);
		}
	});

	// Поиск случайного соперника
	socket.on("findRandomOpponent", () => {
		waitingRandom.add(socket);
		socket.emit("statusChange", "randomFinding");
	});
});
