/* 
Will re-implement DOM manipulations
with React instead of Plain old HTML
since it is a more scalable approach

It works!
run the tests:
$ jest lesson8
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
// simple function since state is in redux store.
// No need for class to hold state. 
// Button functions are callbacks
// to avoid hardcoding Redux reducers
// Keeps its clean
const Counter = ({ 
  value,
  onIncrement,
  onDecrement 
}) => (
  <div>
    <h1>{ value }</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

// using Redux's createStore()
const { createStore } = Redux;
const store = createStore(counter);

// callback to reflect UI change based on state change by action
// render will call anytime store state changes
const render = () => {
  ReactDOM.render(
    <Counter 
      id="counter"
      value={store.getState()} 
      onIncrement={() => 
        store.dispatch({
          type: 'INCREMENT'
        })}
      onDecrement={() => 
        store.dispatch({
          type: 'DECREMENT'
        })}
      />,
    document.getElementById('root')
  );
};

// subscribe render() to store 
// its like passing in an anon function with code above
store.subscribe(render);
render();

/*
using React since its scalable
render() will be called anytime store changes
since render() has subscribed to the store.

So we can pass render() the current state:
<Counter value ={store.getState()} />

Our Counter View Component can just be a 
a simple functional component.

Since all the state is in Redux store.
So no need for class to hold state. 

In Counter function,
we want to add increment and decrement 
buttons, but we DONT want to hardcode
redux to the implementation. 

So, we add them as callbacks. 

Counter is a dumb component,
since it does not contain any business logic.
It only has presentation logic aka 
how data with renderable output
and how callbacks passed thru props
are bound by event handlers. 

When we render Counter, we tell it 
that its value should come from Redux
store. 
When user presses increment or decrement
we dispatch an action. 

That action goes into a reducer, 
and we get a new state,
which updates the UI since the render method 
has subscribed to any state changes from the store. 






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