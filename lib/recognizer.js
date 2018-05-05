function recognize(text) {
  if (!text) {
    return Promise.reject(new Error());
  }

  return Promise.resolve([{
    title: 'Paris',
    description: 'capital city of France',
    uri: 'https://wikidata.org/Q90'
  }]);
}

const Recognizer = function () {
  const insert = () => Promise.resolve();

  return {
    recognize,
    insert
  };
}

module.exports = Recognizer;
