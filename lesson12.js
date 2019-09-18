// Redux: Writing a Todo List Reducer 
// (Toggling a Todo)

// we will write a Todo list reducer
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: action.id,
          text: action.text,
          completed: false  // initialized when action created
        }
      ];

    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {  // only change todo in question
          return todo;
        }
        return {  // if not todo return it untouched
          ...todo,  // spread rest of properties from todo
          completed: !todo.completed  // invert complete property and update
        };
      });

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

*/