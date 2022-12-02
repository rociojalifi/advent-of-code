const inputs = require("../inputs/01");

const readNum = (str) => parseInt(str, 10);

const parseGroups = (input) => {
  return (
    // Array < string >
    input
      .split("\n\n")
      // Array < Array < string > >
      .map((group) => group.split("\n"))
      // Array < Array < number > >
      .map((lines) => lines.map((line) => readNum(line)))
  );
};

// map :: (X => Y) => Array < X > => Array < Y >

// reduce :: (Y, X => Y) => Y => Array < X > => Y

const sum = (numbers) => {
  // Array < number >
  //   => number
  return numbers.reduce((acc, x) => acc + x, 0);
};

const sumGroups = (groups) => {
  // Array < Array < number > >
  // => Array < number >
  return groups.map((group) => sum(group));
};

const findLargest = (numbers) => {
  return numbers.reduce((acc, x) => (acc > x ? acc : x), -Infinity);

  // [1, 5, 3, 18, 2]
  // (-Infinity, 1) => 1
  // (1, 5) => 5
  // (5, 3) => 5
  // (5, 18) => 18
  // (18, 2) => 18
};

const findLargest3 = (numbers) => {
  // reduce :: (Y, X => Y) => Y => Array < X > => Y

  return numbers.reduce(
    ([a, b, c], x) => {
      if (x > a) return [x, a, b];
      if (x > b) return [a, x, b];
      if (x > c) return [a, b, x];

      return [a, b, c];
    },
    [0, 0, 0]
  );

  // [1, 5, 3, 18, 2]
  // ([0, 0, 0], 1) => [1, 0, 0]
  // ([1, 0, 0], 5) => [5, 1, 0]
  // ([5, 1, 0], 3) => [5, 3, 1]
  // ([5, 3, 1], 18) => [18, 5, 3]
  // ([18, 5, 3], 2) => [18, 5, 3]
};

const solve = (input) => {
  const groups = parseGroups(input);
  const totals = sumGroups(groups);
  const largest = findLargest(totals);
  const largest3 = findLargest3(totals);

  return { largest, largest3 };
};

const run = () => {
  const result = solve(inputs.real);

  console.log(`Largest:   ${result.largest}`);
  console.log(`Largest 3: ${sum(result.largest3)}`);
};

module.exports = run
