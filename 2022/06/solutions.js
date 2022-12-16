import * as utils from "../../utils/utils.js";

const data = utils.readInput().trim("\r\n");

function lookForStartInData(distinctCount) {
  for (let index = 0; index < data.length; index++) {
    if (index < distinctCount - 1) continue;

    let found = -1;
    for (let i = index - distinctCount + 1; i <= index; i++) {
      let substring = data.substring(i + 1, index + 1);
      found = substring.split("").find((val) => val == data[i]);
      if (found != undefined) {
        break;
      }
    }

    if (found == undefined) {
      return index + 1;
    }
  }
}

utils.printSolution(1, lookForStartInData(4));
utils.printSolution(2, lookForStartInData(14));
