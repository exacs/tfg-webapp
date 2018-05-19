const data = require('./data/index');

module.exports = {
  getData: async function (year, dimension) {
    // Read the data from the database
    const movements = await data.getData()
    // Link those data to Wikidata
    // Return
    return movements[year];
  },

  getCountries: async function (year) {
    const countries = await data.getCountries();

    return countries.map(
      ({countryCode, gdp}) => ({
        country: countryCode.toLowerCase(),
        gdp
      })
    );
  }
}
