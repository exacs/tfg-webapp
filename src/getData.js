const data = {
  2015: [
    {origin: 'sy', destination: 'fr', amount: 10000},
    {origin: 'sy', destination: 'es', amount:  3000},
    {origin: 'ma', destination: 'es', amount: 12000},
    {origin: 'ma', destination: 'fr', amount:  5000},
    {origin: 'es', destination: 'fr', amount:  1000},
    {origin: 'sy', destination: 'se', amount: 15000},
    {origin: 'es', destination: 'se', amount:  5500},
    {origin: 'fr', destination: 'se', amount:  2000}
  ]
}

module.exports = async function getData (year, dimension) {
  // Read the data from the database
  // Link those data to Wikidata
  // Return
  return data[year] || data['2015'];
}
