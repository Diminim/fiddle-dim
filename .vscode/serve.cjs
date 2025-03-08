exports.execute = async (args) => {
   // args => https://egomobile.github.io/vscode-powertools/api/interfaces/contracts.workspacecommandscriptarguments.html

   // s. https://code.visualstudio.com/api/references/vscode-api
   const vscode = args.require('vscode');
   const terminal = vscode.window.activeTerminal;

   const texts = [
      "npx statikk builds/standalone --port 8081 --coi -cors"


      // "npx http-server -a localhost -c-1 -o /love/ --cors=*",
      // "npx http-server -a localhost -c-1 --cors -o /love/",

      // "npx http-server -a localhost -c-1 -o /love/ --cors=* --header=Cross-Origin-Opener-Policy:same-origin,Cross-Origin-Embedder-Policy:credentialless",

      // "npx http-server -a localhost -c-1 --cors Cross-Origin-Opener-Policy:same-origin,Cross-Origin-Embedder-Policy:credentialless -o /love/",


      // "npm i serve"
   ];

   for (const text of texts) {
      terminal.sendText(text)
   }
};



