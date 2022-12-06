import {
  readInput,
  sum,
  isLowerCase,
  printSolution,
} from "../../utils/utils.js";

const data = readInput("2022/03/input.txt");

const sumOfPriorities1 = sum(
  data
    .trim("\r\n")
    .split("\r\n")
    .map((sack) => [
      sack.slice(0, sack.length / 2).split(""),
      sack.slice(sack.length / 2).split(""),
    ])
    .map((sackCompartments) =>
      sackCompartments[0].find((item) => sackCompartments[1].includes(item))
    )
    .map((item) => item.charCodeAt(0) - (isLowerCase(item) ? 96 : 38))
);

printSolution(1, sumOfPriorities1);
