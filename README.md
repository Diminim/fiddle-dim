Process:
love.js
copied lovejs/index.html and turned into love.html with some changes to remove styling

lua-js-api
copied js.lua to game and got rid of webd stuff
moved consolewrapper and globalizeFS to builds
renamed globalizeFS.js to .cjs for type="module" compat

built from game and put it in builds
copied out game.data, game.js, love.js, love.wasm to root

Write something to the filesystem to wake it up
Made js.lua not read filesystem without checking if it exists
Actually increment request count


TODO:
DIY tut

error handling

Virtual filesystem viewer and editor
Text editor
file uploading
lua terminal

Play, restart, pause, inspector/interactive, autoplay

luajit extensions