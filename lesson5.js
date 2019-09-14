// Redux: Writing a Counter Reducer with Tests

// reducer for counter
// handles unknown actions by returning current state
// handles undefined state by returning default state
function counter(state, action) {
  // if undefined, must return initial state of app
  if (typeof state === 'undefined') {
    return 0;
  }

  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state; // action.type not +/-, return current state
  }
}

module.exports = counter;

/*
remember:
reducer = PrevState + CurrentAction -> New State

state = object that is previous data/state
action = text that describes action
strings are good because they are serializable.

is the process of translating data structures 
or object state into a format that can be stored 
(for example, in a file or memory buffer) 
or transmitted (for example, across a network connection link)
 and reconstructed later 
 (possibly in a different computer environment)

See: https://en.wikipedia.org/wiki/Serialization

Reducer is in control of application state.
However, it does not specify the initial state.

*/