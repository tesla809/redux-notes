const counter = require('./lesson5');

test('Counter increments and decrements', () => {
  expect(
    counter(0, { type: 'INCREMENT' })
  ).toEqual(1);
  
  expect(
    counter(1, { type: 'INCREMENT' })
  ).toEqual(2);
  
  expect(
    counter(2, { type: 'DECREMENT' })
  ).toEqual(1);
  
  expect(
    counter(2, { type: 'DECREMENT' })
  ).toEqual(1);
});
