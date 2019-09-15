// counter reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// equivalent code
// var creatStore = Redux.createStore 
// import { createStore } from Redux
const { createStore } = Redux;
const store = createStore(counter);  // creates the Redux store

// callback to reflect UI change based on state change by action
const render = () => {
  document.body.innerText = store.getState();
  console.log(document.body.innerText);
};

// subscribe render() to store 
// its like passing in an anon function with code above
store.subscribe(render);
render();


// when clicked, number will go up
document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

/*
imported redux file
exports a single global variable 
called Redux.

store binds 3 principles of Redux:
1. It holds the current apps state object
2. It lets you dispatch actions
3. When store created, you specify reducer that tells 
how state is updated with action. 

Store has 3 important methods:
1. getState()- retrieves current state of Redux store aka app state

2. dispatch()- lets you dispatch actions to change state of app
It is the most commonly used method.

3. store.subscribe()- lets you register a callback that Redux store 
will fire anytime an action has been dispatched. 
This will let you can update the UI of you app 
with the current app state.

rendering in the subscribe callback
won't display the default state. 
*/