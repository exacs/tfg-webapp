// Generate example data
const fs = require('fs');
const range = require('lodash/range');
const countryCodes = require('./src/data/country-codes');

const AMOUNT_OF_DATA = 1000;

function generateMovement() {
  const generateCountry = () => countryCodes[parseInt(Math.random() * countryCodes.length)];
  const MAX_AMOUNT = 10000;

  return {
    origin: generateCountry(),
    destination: generateCountry(),
    amount: parseInt(Math.random() * MAX_AMOUNT * 2 - MAX_AMOUNT)
  }
}

const years = {}
const d = range(2007, 2018)
  .forEach(y => {
    years[y] = range(AMOUNT_OF_DATA).map(generateMovement)
  });

const json = JSON.stringify(years);

fs.writeFile('./src/data/movements.json', json, 'utf8', () => {
  console.log('end of writing data');
});
