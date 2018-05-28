const data = require('./data/index');

async function getCountries() {
  // Get "essential" data of each country:
  // - country (Wikidata URI)
  // - countryLabel (the name)
  // - countryCode (2-digits uppercase)
  // - pppgdp_capita (PPP GDP per cápita)
  // - freeCountry (is the country "free country"?)
  const countries = await data.getCountries();

  // Get the HDI of the countries:
  // - country (Wikidata URI)
  // - countryLabel (the name)
  // - countryCode (2-digits uppercase)
  // And:
  // - hdi_year (year of HDI value)
  // - hdi_v (HDI value of that year)
  const hdis = await data.getHdi();

  // Return an array of
  // {
  //   country: { identifiers
  //     uri: Wikidata URI
  //     name: the name
  //     code: country code
  //   },
  //   pppgdp_capita: PPP GDP per cápita of that country
  //   freeCountry: if the country is free or not
  //   hdi: [{ HDIs of the country over time
  //     year: Year
  //     value: the HDI value
  //   }]
  // }

  return countries
    .map(c => ({
      country: {
        uri: c.country,
        name: c.countryLabel,
        code: c.countryCode.toLowerCase()
      },
      pppgdpCapita: c.pppgdp_capita,
      freeCountry: c.freeCountry === 'true',
      hdi: hdis
        .filter(h => h.countryCode === c.countryCode)
        .map(h => ({
          year: h.hdi_year,
          value: h.hdi_v
        }))
    }));
}

async function getData (year, filter) {
  // Read the data from the database
  const movements = await data.getData();
  const countries = await getCountries();
  const getCountry = code => countries.filter(c => c.country.code===code)[0];

  // Expand all movements
  const expandedMovements = movements[year]
    .map(({origin, destination, amount}) => ({
      origin: getCountry(origin),
      destination: getCountry(destination),
      amount
    }))
    .filter(({origin, destination, amount}) => origin && destination);

  // Filter movements based on "filter". Filter can be
  // - "free_country": from false to true
  // - "gdp_capita": from lower to higher
  // - "hdi": from < .50 to > .75
  // ff is the filter function. By default: no filter
  let ff = () => true;

  if (filter === 'free_country') {
    // Absolute terms
    ff = ({origin, destination}) => (!origin.freeCountry && destination.freeCountry);

  } else if (filter === 'gdp_capita') {
    // Relative terms
    ff = ({origin, destination}) => (origin.pppgdpCapita < destination.pppgdpCapita);

  } else if (filter === 'hdi') {
    // Time-relevant
    ff = ({origin, destination}) => {
      const oh = origin.hdi.filter(h => h.year === year);
      const dh = destination.hdi.filter(h => h.year === year);

      // Existance and threshold
      return oh.length > 0 && dh.length > 0 &&
             oh[0].value < 0.50 && dh[0].value > 0.75;
    }
  }
  // Return

  return expandedMovements
    .filter(ff)
    .map(({origin, destination, amount}) => ({
      origin: origin.country,
      destination: destination.country,
      amount
    }));
}

module.exports = {
  getData,
  getCountries
}
