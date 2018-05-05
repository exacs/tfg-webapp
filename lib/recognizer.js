const fetch = require('isomorphic-fetch');

function recognize(text) {
  if (!text) {
    return Promise.reject(new Error());
  }

  const url =
    `https://www.wikidata.org/w/api.php` +
    `?action=wbsearchentities&search=${text}&language=en&props=&format=json`;

  return fetch(url)
    .then(r => r.json())
    .then(r =>
      r.search.map(entry => ({
        id: entry.id,
        uri: entry.concepturi,
        label: entry.label,
        description: entry.description
      }))
    );
}

const Recognizer = function () {
  const insert = () => Promise.resolve();

  return {
    recognize,
    insert
  };
}

module.exports = Recognizer;
