// Redux: Writing a Todo List Reducer 
// (Toggling a Todo)

// we will learn how to generate 
// a simple reducer that calls
// many reducers to manage parts 
// of its state by using the combineReducers 
// utility function.

// make composible. 
// We don't want to mix concerns
// of updating a single todo and multiple todos
// So, we split function of individual todo
// and updating group todos

// Here we learn the 
// pattern of reducer composition 
// where one reducer can be called by 
// another reducer to update items inside an array.
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

// lesson15:
// Easy way to combine reducers 
// similar to below
// keys === state object fields it will manage
// so state.x -> keys === x
// values === reducers
// so reducer -> value of key
// ALWAYS NAME REDUCER AFTER THE STATE KEY
// THAT THEY MANAGE
// since they are the same, you can omit
// the values.
const { combineReducers } = Redux;

// without object literal shorthand notation
// const todoApp = combineReducers({
//   todos: todos,  <- one way to do it
//   visibilityFilter: visibilityFilter
// });


// using Redux helper method
const todoApp = combineReducers({
  todos,  // object literal short hand notation 
  visibilityFilter
});

// naive way to do it
// const todoApp = (state = {}, action) => {
//   return {
//     todo: todos(state.todo, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

// If we create a store with this reducer 
// and log its state, we will find that 
// the initial state of it is an empty array of todos
// each reducer handles the actions independently
const { createStore } = Redux;

// state will now have multiple reducers in one
// this pattern helps scale redux development
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