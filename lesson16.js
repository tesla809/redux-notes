// Redux: Writing a Todo List Reducer 
// (Toggling a Todo)

// lesson16:
// We will learn how to 
// build a reasonable approximation 
// of the combineReducers() utility in 15 lines.

import * as Redux from 'redux';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };

    case 'TOGGLE_TODO':
      if (state.id !== action.id) {  // only change todo in question
        return state;
      }
      return {  // if not todo return it untouched
        ...state,  // spread rest of properties from todo
        completed: !state.completed  // invert complete property and update
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state, 
        todo(undefined, action)  // undefined b/c no state exists yet
      ];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));

    default:
      return state;  // always have default case to avoid bugs
  }
};

// SHOW_ALL is initial/default state if undefined passed in
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
};

// combineReducers implemented from scratch to understand how it works
// only argument is mapping between state keys and reducers
const combineReducers = (reducers) => {
  // return value is another reducer. 
  // Its a function that returns another function
  // same signature as a reducer
  return (state = {}, action) => {
    return Object.keys(reducers)  // get all keys from reducer
      .reduce(  // wants single value from each state
        (nextState, key) => { // by calling each reducer to update state
          nextState[key] = reducers[key](state[key], action);  
          return nextState;               
        },
        {}  // start w/ empty object as initial nextstate, before all the keys are processed
      );  // remember reducer takes a start value as second argument
  };     // this empty object will accumulate and return the entire values of the reducers
};

// naive way to do it without combineReducers
// const todoApp = (state = {}, action) => {
//   return {
//     todo: todos(state.todo, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

/*
for implementation of function above, basically, we are iterating 
over every state.key using its corresponding reducer
to create a new state.
Each state.key has a reducer to handle it state.
We set each key as the reducer 
with the proper arugments and return it.

We will pass in into the generated reducer
only a part of the state via the state[key].

We return and accumulate each new state 
and add it to the empty object that reduce
takes as the second argument.

The final object is an object of key/value pairs
where the key is state.key and value is the reducer 
with the right function signature.

That is passed into another top level function 
which ultimately becomes our main reducer.
*/

// side note: knowing functional programming will help you 
// become more productive and learn how to better use redux
// functional programming allows functions to take other functions
// as inputs

const todoApp = combineReducers({  // using Redux helper method
  todos,  // object literal short hand notation 
  visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

module.exports = { 
  todos
};


/*
We use multiple reducers to compose one reducer.
This pattern helps scale redux development
because different parts of the team can work on 
different todo reducers, handling the same actions,
without causing merge conflicts.

We can use combineReducers to combine 
the reducers that handle different part of the 
state tree into one top level reducer.
All it takes is an object with key name of reducer
and the reference to the reducer function itself.

ALWAYS NAME REDUCER AFTER THE STATE KEY
THAT THEY MANAGE

since they are the same, you can omit the values.
We can use object literal short hand notation,
if the keys and values are the same.


We must avoid mutating state in Redux.
This code teaches us how to write a reducer.

Reminder:
A reducer is a pure function 
to implement the update logic of 
your app.

Ths is how the next state is 
calculated with the current state
and the action being dispatched.

This is Reducer Composition
The pattern described in this lesson is 
pervasive in Redux's development, 
and is called reducer composition.

If a function is doing too much,
we can split it into smaller sub-functions
and use them as building blocks to 
make a larger function aka 
to compose them.

This function is hard to understand 
because it makes us two different concerns, 
how the todo's array is updated, 
and how individual todos are updated. 

This is not a problem unique to Redux. 
Any time a function does too many things, 
you want to extract other functions from it, 
and call them so that every function only 
addresses a single concern.

State tree is made up of different reducers:
Different reducers specify how different parts 
of the state tree are updated in response to actions.

Reducers are normal JavaScript functions.
They can call other reducers to 
delegate and abstract handling  
updates of the parts of this tree 
they manage.

This pattern is applied alot times in Redux, 
There is single top level reducer managing 
the state of your app.
However, its good to express state 
with many reducers calling on each other.
Each will make a contribution to a part 
of the app's state tree.
*/