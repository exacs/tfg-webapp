const Recognizer = require('./recognizer');

test('r.recognize("Paris") returns an array of results', () => {
  const r = Recognizer();

  return r
    .recognize('Paris')
    .then(results => expect(results).toMatchSnapshot());
});

test('r.recognize("Paris", "place") returns an array of results', () => {
  const r = Recognizer();

  return r
    .recognize('Paris', 'place')
    .then(results => expect(results).toMatchSnapshot());
}, 20000);
