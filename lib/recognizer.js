const Recognizer = function () {
  const recognize = () => Promise.resolve([]);
  const insert = () => Promise.resolve();

  return {
    recognize,
    insert
  };
}

module.exports = Recognizer;
