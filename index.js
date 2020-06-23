const fs = require('fs');
const readLine = require('readline')
const lib =  require('./pg_code_challenge');

const inputFilePath = process.argv[2];

const stream = fs.createReadStream(inputFilePath || './people.csv');

const readInterface = readLine.createInterface({
  input: stream,
});

readInterface.on('line', function(line) {
  const customerData = line.split(', ');
 
  const cost = lib.calculateCost({ name: customerData[0], age: parseInt(customerData[1], 10), gender: customerData[2], healthCondition: customerData[3] });
  if (cost) {
    console.log(cost);
  }
});