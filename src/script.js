const app = new Application({
	preparation: PreparationScene,
	computer: ComputerScene,
});

app.start("preparation");

// document.querySelector('[data-action="randomize"]').click();
// document.querySelector('[data-computer="hard"]').disabled = false;
// document.querySelector('[data-computer="hard"]').click();

// for (let y = 0; y < 10; y++) {
// 	for (let x = 0; x < 10; x++) {
// 		const shot = new ShotView(x, y);
// 		app.opponent.addShot(shot);
// 	}
// }
