import fs from "fs";

export function readInput(path = "input.txt") {
  return fs.readFileSync(path, {
    encoding: "utf8",
    flag: "r",
  });
}

export function sum(numberArray) {
  return numberArray.reduce((acc, value) => acc + value, 0);
}

export function count(numberArray) {
  return numberArray.reduce((acc, value) => acc + 1, 0);
}

export function parseDecToInt(stringValue){
  return parseInt(stringValue, 10)
}

export function isLowerCase(char) {
  return char.toUpperCase() != char;
}

export function printSolution(num, solution) {
  console.log("Solution Part " + num + ": ");
  console.log(solution);
}
