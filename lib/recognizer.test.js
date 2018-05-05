const Recognizer = require('./recognizer');
jest.mock('./wikidata');

test('Recognizer() returns an object', () => {
  expect(Recognizer()).toBeInstanceOf(Object);
});

test('Recognizer() returns an object with "recognize" and "insert"', () => {
  expect(Recognizer()).toMatchObject({
    recognize: expect.any(Function),
    insert: expect.any(Function)
  });
});

test('r.recognize() fails if no parameters are passed', () => {
  const r = Recognizer();

  return expect(r.recognize())
    .rejects
    .toThrow();
});

test('r.recognize("Paris") returns an array of results', () => {
  const r = Recognizer();

  return r
    .recognize('Paris')
    .then(results => results.forEach(result => {
      expect(result).toMatchObject({
        id: expect.any(String),
        label: expect.any(String),
        description: expect.any(String),
        uri: expect.any(String),
      });
    }))
});

test('r.recognize("Paris", "place") returns an array of less results', () => {
  const r = Recognizer();
  return Promise
    .all([
      r.recognize('Paris'),
      r.recognize('Paris', 'place')
    ])
    .then(([r1, r2]) => expect(r1.length).toBeGreaterThan(r2.length));
});
