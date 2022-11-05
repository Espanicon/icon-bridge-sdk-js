// customPath.ts
//
import path from "path";

/*
 * folderDepth is how many folders deep is customPath.ts file being placed
 * relative to the project main folder.
 *
 * For example in the following case where the project main folder is named
 * "MAIN_FOLDER", and the file customPath is positioned inside the folder named
 * "utils/" the depth would be 1.
 * - MAIN_FOLDER/utils/customPath.ts
 */
const folderDepth = 2;
const fullPath = path.parse(__filename).dir;
const fullPathArray = fullPath.split("/");
const MAIN_FOLDER = fullPathArray[fullPathArray.length - (folderDepth + 1)];

function customPath(relativePath: string) {
  const parsedPath = path.parse(__filename);
  const fullPathSplit = parsedPath.dir.split("/");

  for (let i = 0; i < fullPathSplit.length; i++) {
    if (fullPathSplit[fullPathSplit.length - 1] === MAIN_FOLDER) {
      break;
    } else {
      fullPathSplit.pop();
    }
  }
  fullPathSplit.push(relativePath);

  return fullPathSplit.join("/");
}

if (require.main === module) {
  // if the file gets called directly from the terminal
  let testPath: string | string[] = fullPath.split("/");
  testPath.pop();
  testPath = testPath.join("/");
  console.log(
    `Running ${path.parse(__filename).base} file directly from terminal\n`
  );

  console.log(
    `the module customPath.js works by assuming that it is placed in a folder inside the main project folder, usually a folder named "service" but it doesnt matter the name.\nFor this run customPath is assuming that the main folder is "${MAIN_FOLDER}".\n\nIf the following 2 paths doesnt match then customPath.js will not work properly.\nTrue path: ${testPath +
      "/TEST"}\nCalculated by customPath.js: ${customPath("TEST")}.`
  );
}
// if the file gets imported as a module
// console.log(`${path.parse(__filename).base} file imported as a module`);
export default customPath;
