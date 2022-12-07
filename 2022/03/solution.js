import * as utils from "../../utils/utils.js";

const data = utils.readInput().trim("\r\n").split("\r\n");

const sumOfPriorities1 = utils.sum(
  data
    .map((sack) => [
      sack.slice(0, sack.length / 2).split(""),
      sack.slice(sack.length / 2).split(""),
    ])
    .map((sackCompartments) =>
      sackCompartments[0].find((item) => sackCompartments[1].includes(item))
    )
    .map((item) => item.charCodeAt(0) - (utils.isLowerCase(item) ? 96 : 38))
);

utils.printSolution(1, sumOfPriorities1);

const sumOfPriorities2 = utils.sum(
  data
    .reduce((array, sack) => {
      let value = sack.split("");
      if (array.length == 0 || array[array.length - 1].length == 3) {
        array.push([value]);
      } else {
        array[array.length - 1].push(value);
      }
      return array;
    }, [])
    .map((sackgroups) =>
      sackgroups[0].find(
        (item) => sackgroups[1].includes(item) && sackgroups[2].includes(item)
      )
    )
    .map((item) => item.charCodeAt(0) - (utils.isLowerCase(item) ? 96 : 38))
);

utils.printSolution(2, sumOfPriorities2);
