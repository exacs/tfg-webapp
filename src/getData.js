const data = {
  2015: [
    ['es',   5000],
    ['fr',  15000],
    ['ma', -20000]
  ],
  2016: [
    ['es', 20000],
    ['fr',  1500]
  ]
}

module.exports = async function getData (year, dimension) {
  // Read the data from the database
  // Link those data to Wikidata
  // Return
  return data[year] || data['2016'];
}
