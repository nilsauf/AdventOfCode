import * as utils from "../../utils/utils.js";

const data = utils.readInput().trim("\r\n").split("\r\n");

// I Know...
data.splice(0, 10);
const stacks = [
  ["W", "M", "L", "F"],
  ["B", "Z", "V", "M", "F"],
  ["H", "V", "R", "S", "L", "Q"],
  ["F", "S", "V", "Q", "P", "M", "T", "J"],
  ["L", "S", "W"],
  ["F", "V", "P", "M", "R", "J", "W"],
  ["J", "Q", "C", "P", "N", "R", "F"],
  ["V", "H", "P", "S", "Z", "W", "R", "B"],
  ["B", "M", "J", "C", "G", "H", "Z", "W"],
];

const moveData = data.map((line) =>
  line
    .replace("move ", "")
    .replace("from ", "")
    .replace("to ", "")
    .split(" ")
    .map(utils.parseDecToInt)
);

function getFirstCratesAsSolutionString(solutionStacks) {
  return solutionStacks
    .map((stack) => stack[stack.length - 1])
    .reduce((result, val) => result + val, "");
}

const stacksP1 = stacks.map((arr) => [...arr]);
moveData.forEach((move) => {
  for (let count = 0; count < move[0]; count++) {
    let crate = stacksP1[move[1] - 1].pop();
    stacksP1[move[2] - 1].push(crate);
  }
});

const topsP1 = getFirstCratesAsSolutionString(stacksP1);
utils.printSolution(1, topsP1);

const stacksP2 = stacks.map((arr) => [...arr]);
moveData.forEach((move) => {
  let count = move[0];
  let from = move[1];
  let to = move[2];
  let crates = stacksP2[from - 1].splice(
    stacksP2[from - 1].length - count,
    count
  );
  stacksP2[to - 1].push(...crates);
});

const topsP2 = getFirstCratesAsSolutionString(stacksP2);
utils.printSolution(2, topsP2);
