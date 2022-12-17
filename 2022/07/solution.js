import * as utils from "../../utils/utils.js";

const data = utils.readInput().trim("\r\n").split("\r\n");

const root = {};
const directorySizes = [];
let currentPath = [];

function getCurrentDir() {
  let dir = root;
  currentPath.forEach((val) => (dir = dir[val]));
  return dir;
}

function collectDirSizes(dir) {
  let size = 0;
  Object.values(dir).forEach((val) => {
    if (Number.isInteger(val)) {
      size += val;
    } else {
      size += collectDirSizes(val);
    }
  });
  directorySizes.push(size);
  return size;
}

data.forEach((line) => {
  if (line.startsWith("$")) {
    if (line.includes("cd")) {
      let target = line.split(" ")[2];
      if (target == "..") {
        currentPath.pop();
      } else if (target != "/") {
        currentPath.push(target);
      }
    }
  } else {
    let curDir = getCurrentDir();
    let lineParts = line.split(" ");
    if (line.startsWith("dir")) {
      let dirName = lineParts[1];
      curDir[dirName] = {};
    } else {
      let size = lineParts[0];
      let name = lineParts[1];
      curDir[name] = utils.parseDecToInt(size);
    }
  }
});

const rootSize = collectDirSizes(root);

const countP1 = utils.sum(directorySizes.filter((size) => size < 100000));
utils.printSolution(1, countP1);

const availableSpace = 70000000 - rootSize;
const neededSpace = 30000000 - availableSpace;
const dirSizeToDelete = directorySizes
  .filter((size) => size >= neededSpace)
  .sort((a, b) => a - b)[0];
utils.printSolution(2, dirSizeToDelete);
