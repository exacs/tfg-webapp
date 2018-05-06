const wikidata = require('./wikidata');
const psql = require('./psql');

function recognize(text, type) {
  if (!text) {
    return Promise.reject(new Error());
  }

  const searchResults = wikidata.search(text);

  if (type === 'place') {
    return searchResults
      .then(entries => Promise.all(entries.map(entry => 
        wikidata.isPlace(entry.uri).then(isPlace => ({ isPlace, entry }))
      )))
      .then(entries => entries.filter(({isPlace, entry}) => isPlace))
      .then(entries => entries.map(({entry}) => entry));
  } else {
    return searchResults;
  }
}

async function insert(data) {
  if (!data.origin || !data.destination || !data.amount || !data.startDate || !data.endDate) {
    return Promise.reject(new Error());
  }

  // First, recognize origin and destination
  const [originConcepts, destinationConcepts] = await Promise.all([
    recognize(data.origin, 'place'),
    recognize(data.destination, 'place')
  ]);

  const insertData = {
    origin: originConcepts[0],
    destination: destinationConcepts[0],
    amount: data.amount,
    startDate: data.startDate,
    endDate: data.endDate
  };

  return psql
    .insert(insertData)
}

const Recognizer = function () {
  return {
    recognize,
    insert
  };
}

module.exports = Recognizer;
