// Redux: Writing a Todo List Reducer 
// (Toggling a Todo)

// we will write a Todo list reducer
const addTodos = (state = [], action) => {
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

const toggleTodo = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return state.map(todo => {  // map iterator since array can be more than 1 element.
        if (todo.id !== action.id) {  // only change todo in question
          return todo;  // if not todo return it untouched
        }
        return {  // if we are here, then we have our todo to change
          ...todo,  // spread rest of properties from todo
          completed: !todo.completed  // invert complete property and update
        }
      });
    default:
      return state;
  }
}

module.exports = { 
  addTodos,
  toggleTodo
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