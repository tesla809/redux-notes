// Redux: Avoiding Object Mutations with 
// Object.assign() and ...spread

// We want to manipulate our objects
// How do we change our state
// without mutations?

// mutated version- not allowed in Redux
const toggleTodoMutated = (todo) => {
  todo.completed = !todo.completed;  // flips and mutates value
  return todo;
}

// If we add new props to object, 
// We might forget to add them to reducer. 
// Might introduce bug.
const toggleTodoBug = (todo) => {
  return {        // create new object with modified data
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  }
}

// use Object.assign() to avoid issue above
const toggleTodoObjAssign = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
}

// using spread operator
// most clean and easiest way
// not part of ES6, its propsed in ES7
// enabled in Babel if stage 2 preset enable
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
}

module.exports = { 
  toggleTodo
};

/*
We must avoid mutating state in Redux.
This code teaches us how to add, remove or conact
data without mutating its state.

We use the Object.assign() and ...spread operator
to keep our functions PURE and return 
new objects. 

Looking at our lesson10.test.js file,
we learned how to protect ourselves against 
mutations using the deep-freeze package.

Object.assign()- allows you to assign 
properties of several objects, 
onto an object. 
Object.assign(
  targetObj,
  sourceObj1,
  sourceObj2,
  sourceObjN ...
)
If objs try to change same property,
Only the last obj will be the one choosen.
Sort of like CSS.
A new method in ES6. 
So, not natively available in all browsers.
Use babel or polyfill.

...(spread operator)- Spread syntax allows an iterable
like array expressions, strings or object expressions
to be expanded in places where arguments or elements 
are expected. 

These places can be function calls, array literals,
or object literals.

note:
toggleTodo():

  return Object.assign({}, todo, {
    completed: !todo.completed
  });

  Object.assign is like assignment operator:
  target object = source obj 1 + source obj 2 + ...
  source objs will be copied 
  and mutate to target object.

  We pass in an empty object as the 
  first parameter since we don't 
  want to mutate any existing data.

  The rest of the parameters are 
  source objects to be pass in.

  If different sources specify 
  different values of the same property,
  ie, they all want to change the same property,
  the last property passed will be the one
  that is used.

  So we can override data this way 
  in a new array.
*/