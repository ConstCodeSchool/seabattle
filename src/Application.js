class Application {
	mouse = null;

	player = null;
	opponent = null;

	scenes = {};
	activeScene = null;

	constructor(scenes = {}) {
		const mouse = new Mouse(document.body);

		const player = new BattlefieldView(true);
		const opponent = new BattlefieldView(false);

		Object.assign(this, { mouse, player, opponent });

		document.querySelector('[data-side="player"]').append(player.root);
		document.querySelector('[data-side="opponent"]').append(opponent.root);

		for (const [sceneName, SceneClass] of Object.entries(scenes)) {
			this.scenes[sceneName] = new SceneClass(sceneName, this);
		}

		for (const scene of Object.values(this.scenes)) {
			scene.init();
		}

		requestAnimationFrame(() => this.tick());
	}

	tick() {
		requestAnimationFrame(() => this.tick());

		if (this.activeScene) {
			this.activeScene.update();
		}

		this.mouse.tick();
	}

	start(sceneName, ...args) {
		if (this.activeScene && this.activeScene.name === sceneName) {
			return false;
		}

		if (!this.scenes.hasOwnProperty(sceneName)) {
			return false;
		}

		if (this.activeScene) {
			this.activeScene.stop();
		}

		const scene = this.scenes[sceneName];
		this.activeScene = scene;
		scene.start(...args);

		return true;
	}
}
