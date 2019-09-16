// imported deep-freeze to make we can't mutate state 
// DeepFreeze recursively Object.freeze() objects
// and functions

// deep-freeze docs
// yarn: https://yarnpkg.com/en/package/deep-freeze#readme
// working docs: https://github.com/substack/deep-freeze
// working docs: https://www.npmjs.com/package/deep-freeze

// Here we learned how to protect ourselves against 
// mutations using the deep-freeze package
// in our tests
const deepFreeze = require('deep-freeze');
const { 
  addCounter, 
  removeCounter,
  incrementCounter } = require('./lesson9.js');

test('Adds a counter to list', () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);  // prevents state mutations

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
});

test('Removes a counter from list', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);  // prevents state mutations

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
});

test('Increments counter in list', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
});
