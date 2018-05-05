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

test('r.recognize() returns a Promise that resolves in an array', () => {
  const r = Recognizer();

  return expect(r.recognize())
    .resolves
    .toEqual(expect.any(Array));
});
