function search(text) {
  return Promise.resolve([
    {
      id: "Q90",
      uri: "http://www.wikidata.org/entity/Q90",
      label: "Paris",
      description: "capital city of France"
    },
    {
      id: "Q167646",
      uri: "http://www.wikidata.org/entity/Q167646",
      label: "Paris",
      description: "son of Priam, king of Troy"
    },
    {
      id: "Q830149",
      uri: "http://www.wikidata.org/entity/Q830149",
      label: "Paris",
      description: "county seat of Lamar County, Texas, United States"
    },
    {
      id: "Q366081",
      uri: "http://www.wikidata.org/entity/Q366081",
      label: "Paris Bordone",
      description: "Italian artist"
    },
    {
      id: "Q3181341",
      uri: "http://www.wikidata.org/entity/Q3181341",
      label: "Paris",
      description: "county seat of Bourbon County, Kentucky, United States"
    },
    {
      id: "Q1018504",
      uri: "http://www.wikidata.org/entity/Q1018504",
      label: "Paris",
      description: "city in Tennessee, United States"
    },
    {
      id: "Q162121",
      uri: "http://www.wikidata.org/entity/Q162121",
      label: "Paris",
      description: "genus of plants"
    }
  ]);
}

function isPlace(uri) {
  const places = [
    'http://www.wikidata.org/entity/Q90',
    'http://www.wikidata.org/entity/Q830149',
    'http://www.wikidata.org/entity/Q3181341',
    'http://www.wikidata.org/entity/Q1018504'
  ]

  return Promise.resolve(places.indexOf(uri) !== -1);
}

module.exports = {
  search,
  isPlace
}
