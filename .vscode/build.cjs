exports.execute = async (args) => {
	// args => https://egomobile.github.io/vscode-powertools/api/interfaces/contracts.workspacecommandscriptarguments.html

	// s. https://code.visualstudio.com/api/references/vscode-api
	const vscode = args.require('vscode');
	const terminal = vscode.window.activeTerminal;

	const texts = [
		"rm -rf builds/lovejs;     mkdir builds/lovejs",
		"rm -rf builds/standalone; mkdir builds/standalone",
		"rm -rf builds/embed;      mkdir builds/embed",

		"npx love.js src/game builds/lovejs -t name -c",

		// Standalone
		"cp -f builds/lovejs/game.data builds/standalone/game.data",
		"cp -f builds/lovejs/game.js   builds/standalone/game.js",
		"cp -f builds/lovejs/love.js   builds/standalone/love.js",
		"cp -f builds/lovejs/love.wasm builds/standalone/love.wasm",

		"cp -r src/content builds/standalone",
		"cp -r src/scripts builds/standalone",
		"cp -r src/pages/. builds/standalone",

		"cd builds/standalone; node scripts/globalizeFS.cjs; rm scripts/globalizeFS.cjs; cd ../..",


		// Embed

		"cp -r builds/standalone/* builds/embed",
		"rm -rf builds/embed/content",
		"rm builds/embed/index.html",
		"mv builds/embed/love.html builds/embed/index.html"

		// "cp -f builds/lovejs/game.data builds/embed/game.data",
		// "cp -f builds/lovejs/game.js   builds/embed/game.js",
		// "cp -f builds/lovejs/love.js   builds/embed/love.js",
		// "cp -f builds/lovejs/love.wasm builds/embed/love.wasm",

		// "cp -r src/content builds/embed",
		// "cp -r src/scripts builds/embed",
		// "cp -r src/pages/. builds/embed",

		// "cd builds/embed; node scripts/globalizeFS.cjs; rm scripts/globalizeFS.cjs; cd ../..",

		// "rm builds/embed/index.html",
		// "mv builds/embed/love.html builds/embed/index.html"


		// "npx love.js game builds/lovejs -t name -c",

		// "cp -f builds/lovejs/game.data builds/game.data",
		// "cp -f builds/lovejs/game.js   builds/game.js",
		// "cp -f builds/lovejs/love.js   builds/love.js",
		// "cp -f builds/lovejs/love.wasm builds/love.wasm",

		// "rm -rf builds/lovejs/",

		// "cd builds; node globalizeFS.cjs; cd ..",
		// delete globalizeFS?
	];

	for (const text of texts) {
		terminal.sendText(text)
	}
};
