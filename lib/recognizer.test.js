const Recognizer = require('./recognizer');

test('Recognizer() returns an object', () => {
  expect(Recognizer()).toBeInstanceOf(Object);
});
