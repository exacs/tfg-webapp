const fs = require('fs');
const path = require('path');

function readFile(file) {
  return new Promise((accept, reject) => {
    fs.readFile(path.resolve(__dirname, `${file}.json`), 'utf8', function (err, data) {
      if (err) throw err;
      accept(JSON.parse(data));
    })
  });
}

module.exports = {
  getData() { return readFile('movements'); },

  getCountries() { return readFile('gdp'); },

  getCountryNames() { return readFile('country-names'); }
}
