// Redux: Writing a Todo List Reducer 
// (Adding a Todo)

// we will write a Todo list reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,  // adds all other elements in array
        {
          id: action.id,
          text: action.text,
          completed: false  // initialized when action created 
        }
      ];
    default:  // every reducer MUST return current state
      return state;  // for any unknwon action
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

*/