/* 
Will re-implement createStore()
from scratch to understand it.

It works!
run the tests:
$ jest lesson7
*/ 

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

// re-created createStore
// apart from some edge cases and minor details
// is close to what is shipped in Redux
const createStore = (reducer) => {
  let state;  // store holds the current state
  let listeners = [];  // keeps track of all listeners

  const getState = () => state;  // getter to return current state

  const dispatch = (action) => {  // only way to update state
    state = reducer(state, action);  // dispatch action with reducer
    listeners.forEach(
      listener => listener()  // notify every change listener by calling it
    );  
  };

  const subscribe = (listener) => {  // callback to update UI
    listeners.push(listener);  // add to array to track listeners
    /*
      important piece: how to unsubscribe
      instead of adding a dedicated unsubscribe method
      we return a function to filter out 
      any listeners that we want
    */
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  // render w/ initial state dummy action
  // to get reducer to return default value
  dispatch({});  

  return { getState, dispatch, subscribe }; // expose methods
}

// const { createStore } = Redux;
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

/*
re-created createStore to understand it
createStore():
  1. holds state of app.
  2. getState returns current state of variable
  3. dispatch updates store variable
  4. subscribe is callback that mutates state with listener
  5. subcribe() can be called multiple times with different listeners
  we keep track of the listeners.

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

createStore() hold data 
  -> dispatch() send action 
    -> subscribe() -> callback for new UI
*/