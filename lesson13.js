// Redux: Writing a Todo List Reducer 
// (Toggling a Todo)

// we will write a Todo list reducer

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

module.exports = { 
  todos
};


/*
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