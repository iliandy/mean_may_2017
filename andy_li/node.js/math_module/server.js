var math = require("./mathlib")();

console.log("2 + 3 = ", math.add(2, 3));
console.log("3 * 5 = ", math.multiply(3, 5));
console.log("5^2 = ", math.square(5));
console.log("random number between 1 - 35 = ", math.random(1, 35));
