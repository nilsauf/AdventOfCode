import { readInput, sum } from "../../utils/utils.js";

const data = readInput();

const gameData = data
  .trim("\r\n")
  .split("\r\n")
  .map((line) => line.trim("\r\n").split(" "));

const gameResultPoints1 = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const sumPoints1 = sum(
  gameData.map(
    (game) => gameResultPoints1[game[0]][game[1]] + game[1].charCodeAt(0) - 87
  )
);

console.log("Solution Part 1: ");
console.log(sumPoints1);

const gameResultPoints2 = {
  X: 0,
  Y: 3,
  Z: 6,
};

const neededToChooseShapePoints = {
  A: { X: 3, Y: 1, Z: 2 },
  B: { X: 1, Y: 2, Z: 3 },
  C: { X: 2, Y: 3, Z: 1 },
};

const sumPoints2 = sum(
  gameData.map(
    (game) =>
      gameResultPoints2[game[1]] + neededToChooseShapePoints[game[0]][game[1]]
  )
);

console.log("Solution Part 2: ");
console.log(sumPoints2);
