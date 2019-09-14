// pure vs impure functions

// pure functions
function square(x) {
  return x * x;
}

function squareAll(items) {
  return items.map(square);
}

function updateXInDataBase(x) {
  console.log('This is just sample code.');
  console.log('Creating mutations');
}

// Creates side effects
// Impure functions
function impureSquare(x) {
  updateXInDataBase(x);
  return x * x;
}

// this can be done with a map function instead
function impureSquareAll(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}

/*
Pure functions vs impure functions:
Important to understand, 
since Redux requires some functions to be pure.

Pure functions are those whose return values 
depend only upon the values of their arguments. 

Pure functions only calculate the value.
They predictable. 
They always give you the same output 
for the same input.

Pure functions don't have side effects 
like network or database calls. 

Pure functions also do not override 
the values given to them 
or of other data not given to them.

In squareAll(), a new array is returned 
instead of modifying the items that was passed in.

In the impureSquareAll(), the state is mutated. 
Imagine we do have a bunch of state.
if we do this alot, we can create this 
spagetti complexity that is hard to track.
Don't mutate state like this.
*/