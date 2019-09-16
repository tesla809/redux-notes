// imported deep-freeze to make we can't mutate state 
// DeepFreeze recursively Object.freeze() objects
// and functions

// Here we learned how to protect ourselves against 
// mutations using the deep-freeze package
// in our tests
const deepFreeze = require('deep-freeze');
const { toggleTodo } = require('./lesson10.js');

describe('Toggles todo completed field', () => {
  test('Flips todo to from false to true. ', () => {
    const todoBefore = {
      id: 0,
      text: 'Learn Redux',
      completed: false
    };
    const todoAfter = {
      id: 0,
      text: 'Learn Redux',
      completed: true
    };

    deepFreeze(todoBefore);

    expect(
      toggleTodo(todoBefore)
    ).toEqual(todoAfter)
  });
});

