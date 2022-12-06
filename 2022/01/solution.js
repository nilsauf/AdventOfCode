const fs = require("fs");

const data = fs.readFileSync("input.txt", {
  encoding: "utf8",
  flag: "r",
});

const sums = data.split("\r\n\r\n").map((block) =>
  block
    .trim("\r\n")
    .split("\r\n")
    .map((valueString) => parseInt(valueString, 10))
    .reduce((acc, value) => acc + value, 0)
);

console.log("Solution Part 1: ");
console.log(Math.max(...sums));

const sumOfTopThree = sums
  .sort()
  .reverse()
  .slice(0, 3)
  .reduce((acc, value) => acc + value, 0);

console.log("Solution Part 2: ");
console.log(sumOfTopThree);
