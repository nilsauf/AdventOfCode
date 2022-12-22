import * as utils from "../../utils/utils.js";

const treeHeights = utils
  .readInput("./2022/08/input.txt")
  .trim("\r\n")
  .split("\r\n")
  .map((line) => line.split("").map(utils.parseDecToInt));

const countVisibileTrees = utils.sum(
  treeHeights
    .map((treeLine, lineIndex, treeField) => {
      if (lineIndex == 0 || lineIndex == treeField.length - 1) {
        return treeLine.map(() => true);
      } else {
        return treeLine.map((tree, rowIndex) => {
          if (rowIndex == 0 || rowIndex == treeLine.length - 1) {
            return true;
          } else if (
            treeLine
              .slice(0, rowIndex)
              .every((otherTree) => otherTree < tree) ||
            treeLine.slice(rowIndex + 1).every((otherTree) => otherTree < tree)
          ) {
            return true;
          }

          let treeRow = treeField.map((line) => line[rowIndex]);
          if (
            treeRow
              .slice(0, lineIndex)
              .every((otherTree) => otherTree < tree) ||
            treeRow.slice(lineIndex + 1).every((otherTree) => otherTree < tree)
          ) {
            return true;
          }

          return false;
        });
      }
    })
    .map((lineVisibilities) =>
      utils.count(lineVisibilities.filter((visibility) => visibility))
    )
);

utils.printSolution(1, countVisibileTrees);

let calcScenicScorePart = (part, currentTree) => {
  let indexSeen = part.findIndex((otherTree) => otherTree >= currentTree);
  return indexSeen == -1 ? part.length : indexSeen + 1;
};

const maxScenicScore = Math.max(
  ...treeHeights.map((treeLine, lineIndex, treeField) =>
    Math.max(
      ...treeLine.map((tree, rowIndex) => {
        if (
          lineIndex == 0 ||
          rowIndex == 0 ||
          lineIndex == treeField.length - 1 ||
          rowIndex == treeLine.length - 1
        ) {
          return 0;
        }

        let treeRow = treeField.map((line) => line[rowIndex]);

        return (
          calcScenicScorePart(treeLine.slice(0, rowIndex).reverse(), tree) *
          calcScenicScorePart(treeLine.slice(rowIndex + 1), tree) *
          calcScenicScorePart(treeRow.slice(0, lineIndex).reverse(), tree) *
          calcScenicScorePart(treeRow.slice(lineIndex + 1), tree)
        );
      })
    )
  )
);

utils.printSolution(2, maxScenicScore);
