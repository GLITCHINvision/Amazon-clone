import {formatCurrency} from "../../scripts/utils/money.js";

/*  testing 2 test cases
    2 types of test cases
*/
console.log('test suite: formatCurrency');

console.log('convert cents into dollars');

// basic test cases
// test if the code is working
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

// Edge cases
// test with values that are tricky
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds down to the nearest cent');

if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}

// group relate test together === test suite
