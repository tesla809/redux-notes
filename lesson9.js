// Redux: Avoiding Array Mutations 
// with concat(), slice(), and ...spread

// We want to add different counters
// How do we maintain state?
// naive way, mutating state NOT GOOD
const addCounterMutations = (list) => {
  list.push(0);  // mutate state to add list. NOT GOOD.
  return list;
};

// using concat to return new array
const addCounterConcat = (list) => {
  return list.concat([0]);  // concat does not mutate 
}

// using spread operator. Same code, more concise
const addCounter = (list) => {
  return [...list, 0];
  // [prevArray, newElement]
};

// list and index of counter to remove
const removeCounterMutate = (list, index) => {
  list.splice(index, 1);  // mutating state, BAD
  return list;
};

// no mutations
const removeCounterSlice = (list, index) => {
  // this results in removing index
  return list
    .slice(0, index)                  // take part of array before index
    .concat(list.slice(index + 1))    // add to part after index
  // [prevArrayStartNoIndex, prevArrayEndNoIndex]
}

// using es6 spread operator
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),  
    ...list.slice(index + 1)
  ];
  // [prevArrayStartNoIndex, prevArrayEndNoIndex]
}

// mutations BAD
// increments index in list of counters
const incrementCounterMutation = (list, index) => {
  list[index]++;
  return list;
};


// works, but less clean
const incrementCounterNoSpread = (list, index) => {
  return list
    .slice(0, index)  // remove before index, index not exclusive
    .concat([list[index + 1]]) // insert new element incremented by 1
    .concat(list.slice(index + 1))  // add everything after index
   // [prevArrayStart, newElement, prevArrayEnd]
}

// with es6 spread, looks nicer
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),  // return array and spread it
    list[index] + 1,          // our new incremented by 1
    ...list.slice(index + 1)  // return array and spread it
  ];
}

module.exports = { 
  addCounter, 
  removeCounter,
  incrementCounter
};

/*
We must avoid mutating state in Redux.
This code teaches us how to add, remove or conact
data without mutating its state.

We use the .concat(), slice() and spread operator (...)
to keep our functions PURE.

Looking at our lesson9.test.js file,
we learned how to protect ourselves against 
mutations using the deep-freeze package.

.concat()- The concat() method concatenates 
the string arguments to the calling string 
and returns a new string.

.slice()- returns part of an array 
as a new array starting from begin to end (end not included).
Beginning and end represent the index of items in that array. 
The original array will not be modified.

... (spread operator)- Spread syntax allows an iterable
like array expressions, strings or object expressions
to be expanded in places where arguments or elements 
are expected. 

These places can be function calls, array literals,
or object literals.

note:
slice() vs splice():
splice mutates the array
slice only returns a new array with modified data

Note on code removeCounter():
  return list
    .slice(0, index)          
    .concat(list.slice(index + 1)) 

.slice(0, index)- get from start up to index (not including index)
.concat(list.slice(index + 1)) - add it part that starts after index.
We create two arrays and add them together where neither
array has the index. 
So, we remove the index that way. 
*/