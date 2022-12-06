import { readInput, sum } from "../../utils/utils.js";

const data = readInput();

const sums = data.split("\r\n\r\n").map((block) =>
  sum(
    block
      .trim("\r\n")
      .split("\r\n")
      .map((valueString) => parseInt(valueString, 10))
  )
);

console.log("Solution Part 1: ");
console.log(Math.max(...sums));

const sumOfTopThree = sum(sums.sort().reverse().slice(0, 3));

console.log("Solution Part 2: ");
console.log(sumOfTopThree);
