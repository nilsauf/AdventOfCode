import { readInput, sum, printSolution } from "../../utils/utils.js";

const data = readInput();

const sums = data.split("\r\n\r\n").map((block) =>
  sum(
    block
      .trim("\r\n")
      .split("\r\n")
      .map((valueString) => parseInt(valueString, 10))
  )
);

printSolution(1, Math.max(...sums));

const sumOfTopThree = sum(sums.sort().reverse().slice(0, 3));

printSolution(2, sumOfTopThree);
