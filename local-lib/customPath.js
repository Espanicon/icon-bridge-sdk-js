"use strict";
const path = require("path");
const folderDepth = 2;
const fullPath = path.parse(__filename).dir;
const fullPathArray = fullPath.split("/");
const MAIN_FOLDER = fullPathArray[fullPathArray.length - (folderDepth + 1)];
function customPath(relativePath) {
    const parsedPath = path.parse(__filename);
    const fullPathSplit = parsedPath.dir.split("/");
    for (let i = 0; i < fullPathSplit.length; i++) {
        if (fullPathSplit[fullPathSplit.length - 1] === MAIN_FOLDER) {
            break;
        }
        else {
            fullPathSplit.pop();
        }
    }
    fullPathSplit.push(relativePath);
    return fullPathSplit.join("/");
}
if (require.main === module) {
    const testPath = fullPath.split("/");
    testPath.pop();
    const testPath2 = testPath.join("/");
    console.log(`Running ${path.parse(__filename).base} file directly from terminal\n`);
    console.log(`the module customPath.js works by assuming that it is placed in a folder inside the main project folder, usually a folder named "service" but it doesnt matter the name.\nFor this run customPath is assuming that the main folder is "${MAIN_FOLDER}".\n\nIf the following 2 paths doesnt match then customPath.js will not work properly.\nTrue path: ${testPath2 +
        "/TEST"}\nCalculated by customPath.js: ${customPath("TEST")}.`);
}
module.exports = customPath;
//# sourceMappingURL=customPath.js.map