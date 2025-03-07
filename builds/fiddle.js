var readDir      = "content/"; // user defined
var entranceFile = "main.lua"; // user defined

function getDirectoryItems() {
    return "main.lua / lcb-autumn-16x16.png"
}

function getEntrance() {
    return entranceFile
}

async function readAndWrite(relDir, relFilePath) {
    try {
        const absRead = readDir + relFilePath
        const absWrite = relDir + relFilePath


        console.log("read " + absRead)
        console.log("write " + absWrite)

        const response = await fetch(absRead);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.bytes()
        console.log("read " + absRead)

        FS.writeFile(absWrite, data);
        console.log("written " + absWrite)
    } catch (error) {
        console.error(error.message);
    }
}