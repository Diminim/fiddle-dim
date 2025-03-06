exports.execute = async (args) => {
	// args => https://egomobile.github.io/vscode-powertools/api/interfaces/contracts.workspacecommandscriptarguments.html

	// s. https://code.visualstudio.com/api/references/vscode-api
	const vscode = args.require('vscode');
	const terminal = vscode.window.activeTerminal;

	const texts = [

		"rm -rf builds/lovejs; mkdir builds/lovejs",
		"npx love.js game builds/lovejs -t name -c -m 40000000",

		"cp -f builds/lovejs/game.data builds/game.data",
		"cp -f builds/lovejs/game.js   builds/game.js",
		"cp -f builds/lovejs/love.js   builds/love.js",
		"cp -f builds/lovejs/love.wasm builds/love.wasm",

		// "rm -rf love; mkdir love",
		// "git clone https://github.com/Sheepolution/love-fiddle.git love",

		// "npm i love.js -f",

		// "cd love",

		// "npx love.js lua bin -t name",

		// "cp -f bin/game.data game.data",
		// "cp -f bin/game.js   game.js",
		// "cp -f bin/love.js   love.js",
		// "cp -f bin/love.wasm love.wasm",

		// "mv globalizeFS.js globalizeFS.cjs",
		// "node globalizeFS.cjs",

		// "cd ..",
	];

	for (const text of texts) {
		terminal.sendText(text)
	}
};
