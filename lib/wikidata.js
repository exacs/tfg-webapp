const path = require('path');
const fetch = require('isomorphic-fetch');

function search(text) {
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


function isPlace(uri) {
  const concept = path.parse(uri).name;
  const endpointUrl = 'https://query.wikidata.org/sparql';
  const sparqlQuery =
    'SELECT DISTINCT ?type WHERE {' +
    `  wd:${concept} wdt:P31/wdt:P279* ?type.` +
    '  FILTER(?type = wd:Q618123).' +
    '} LIMIT 1';

  const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
  const headers = { 'Accept': 'application/sparql-results+json' };

  return fetch(fullUrl, {headers})
    .then(body => body.json())
    .then(json => json.results.bindings.length > 0);
}

module.exports = {
  search,
  isPlace
};
