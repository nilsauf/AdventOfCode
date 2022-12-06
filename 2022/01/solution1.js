const fs = require("fs");

const data = fs.readFileSync("./2022/01/input.txt", {
  encoding: "utf8",
  flag: "r",
});

const sums = data
  .split("\r\n\r\n")
  .map((block) => 
  	block.trim("\r\n")
    .split("\r\n")
		.map(valueString => parseInt(valueString, 10))
		.reduce((acc, value) => acc + value, 0));

console.log(Math.max(...sums));
