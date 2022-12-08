import * as utils from "../../utils/utils.js";

const data = utils
  .readInput()
  .trim("\r\n")
  .split("\r\n")
  .map((line) => line.replace(",", "-").split("-").map(utils.parseDecToInt));

const countOfCompleteOverlaps = utils.count(
  data.filter(
    (ass) =>
      (ass[0] <= ass[2] && ass[1] >= ass[3]) ||
      (ass[2] <= ass[0] && ass[3] >= ass[1])
  )
);

utils.printSolution(1, countOfCompleteOverlaps);

const countOfPartlyOverlaps = utils.count(
  data.filter(
    (ass) =>
      (ass[0] >= ass[2] && ass[0] <= ass[3]) ||
      (ass[1] >= ass[2] && ass[1] <= ass[3]) ||
      (ass[2] >= ass[0] && ass[2] <= ass[1]) ||
      (ass[3] >= ass[0] && ass[3] <= ass[1])
  )
);

utils.printSolution(2, countOfPartlyOverlaps);
