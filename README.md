## Pg Code Challenge - Luis Revilla

This program has been implemented in JavaScript. `Node.js` is required to run it.

The core functionality has no external dependencies, but the NPM library `Mocha` has been added for testing purposes.

To install Mocha, run:

```
npm install
```

Tests have been included in the `test.js` file. These can be run with the following command:

```
npm run test
```

## Running the program

We're using `Node.js` to run the program, with the following command:

```
node index.js
```

## Input and Output

We've chosen `csv` files as the input format.

```
node index.js <filePath> 
```

This repository includes a file `people.csv` with sample data. The code in `index.js` relies on such file if no other filePath is provided via the CLI.


The expected CSV file has one customer per line, with their data ordered in the following sequence:

```
<name>, <age>, <gender>, <health condition>
```

The program's output will be 'printed' in the terminal.

## Implementation Strategy

Our main function, `calculateCost`, reduces an array of policies for cost increases or discounts into the resulting, final cost. 

Each policy is defined as a higher order function that takes its concerning data (age, gender, etc) and returns a function that only expects a base or partial cost and returns the modified cost.

This approach allows us to easily remove or add aditional policies in the future; or even change the order in which they are applied. 

Furthermore, having the policies as isolated functions also enables us to modify their implementation details without affecting the rest of the program/policies.

```javascript
  const costChangingPolicies = [
    getAgeIncreaseFn(age),
    getConditionIncreaseFn(healthCondition),
    getGenderDiscountFn(gender),
  ];

  const finalPrice = costChangingPolicies.reduce((price, change) => {
    return change(price);
  }, BASE_COST);
};
```