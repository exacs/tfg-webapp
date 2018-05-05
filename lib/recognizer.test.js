const Recognizer = require('./recognizer');

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
