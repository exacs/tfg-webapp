const data = require('./data/index');

module.exports = {
  getData: async function (year, dimension) {
    // Read the data from the database
    const movements = await data.getData();
    const countryNames = await data.getCountryNames();

    function getCountry (code) {
      const found = countryNames
        .filter(({countryCode}) => countryCode === code.toUpperCase());

      if (found.length === 0) {
        // console.log('country code', code, 'not found');
        return {countryLabel: 'nan'}
      }

      return found[0];
    }

    return movements[year].map(({origin, destination, amount}) => ({
      origin: {code: origin, name: getCountry(origin).countryLabel},
      destination: {code: destination, name: getCountry(destination).countryLabel},
      amount
    }));
  },

  getCountries: async function (year) {
    const countries = await data.getCountries();
    const countryNames = await data.getCountryNames();

    return countries.map(
      ({countryCode: cc, gdp}) => ({
        country: cc.toLowerCase(),
        name: countryNames.filter(({countryCode}) => countryCode === cc)[0].countryLabel,
        gdp
      })
    );
  }
}
