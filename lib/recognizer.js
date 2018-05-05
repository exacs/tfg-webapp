const wikidata = require('./wikidata');

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

const Recognizer = function () {
  const insert = () => Promise.resolve();

  return {
    recognize,
    insert
  };
}

module.exports = Recognizer;
