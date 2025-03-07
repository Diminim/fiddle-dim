exports.execute = async (args) => {
	// args => https://egomobile.github.io/vscode-powertools/api/interfaces/contracts.workspacecommandscriptarguments.html

	// s. https://code.visualstudio.com/api/references/vscode-api
	const vscode = args.require('vscode');
	const terminal = vscode.window.activeTerminal;

	const texts = [

		"rm -rf builds/lovejs; mkdir builds/lovejs",
		"npx love.js game builds/lovejs -t name -c",

		"cp -f builds/lovejs/game.data builds/game.data",
		"cp -f builds/lovejs/game.js   builds/game.js",
		"cp -f builds/lovejs/love.js   builds/love.js",
		"cp -f builds/lovejs/love.wasm builds/love.wasm",

		// "rm -rf builds/lovejs/",

		"cd builds; node globalizeFS.cjs; cd ..",
		// delete globalizeFS?
	];

	for (const text of texts) {
		terminal.sendText(text)
	}
};
