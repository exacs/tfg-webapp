const Recognizer = require('./recognizer');
jest.mock('../lib/wikidata');
jest.mock('../lib/psql');

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

test('r.insert() fails if no parameters are passed', () => {
  const r = Recognizer();

  return expect(r.insert())
    .rejects
    .toThrow();
});

test('r.insert(data) recognizes concepts', () => {
  const r = Recognizer();
  const data = {
    origin: 'Paris',
    destination: 'Paris',
    amount: 1000000,
    startDate: new Date(),
    endDate: new Date()
  }

  const paris = {
    description: 'capital city of France',
    id: 'Q90',
    label: 'Paris',
    uri: 'http://www.wikidata.org/entity/Q90'
  }

  const returned = {
    origin: paris,
    destination: paris,
    amount: 1000000,
    startDate: data.startDate,
    endDate: data.endDate
  }

  return expect(r.insert(data))
    .resolves
    .toEqual(returned);
});
