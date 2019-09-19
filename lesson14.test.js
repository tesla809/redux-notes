// imported deep-freeze to make we can't mutate state 
// DeepFreeze recursively Object.freeze() objects
// and functions

// Here we learned how to test
// a Todo list reducer
// adding Toggling a Todo complete property tests
const deepFreeze = require('deep-freeze');
const { todos } = require('./lesson14.js');

describe('Todo list', () => {
  test('Adds todo', () => {
    const stateBefore = [];
    const action = {  // action to pass in
      type: 'ADD_TODO', // type is what we use to determine reducer's response
      id: 0,
      text: 'Learn Redux'
    };
    
    // we DON'T add in the type in state,
    // so it doesnt show up in stateAfter
    const stateAfter = [  // state after passing action
      {
        id: 0,
        text: 'Learn Redux',
        completed: false  // initialized false when created
      }
    ];

    deepFreeze(stateBefore);  // prevent mutations
    deepFreeze(action);       // no mutation in Redux allowed


    expect(
      todos(stateBefore, action)  // reducer takes state, action, returns new state
    ).toEqual(stateAfter) 
  });

  test('Toggles todo to complete or not', () => {
    const stateBefore = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: false
      }
    ];

    const action = {
      type: 'TOGGLE_TODO',  // changes action
      id: 1
    };

    const stateAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: true  // this is marked as completed
      }
    ];

    deepFreeze(action);
    deepFreeze(stateAfter);

    expect(
      todos(stateBefore, action)
    ).toEqual(stateAfter);
  })
});

