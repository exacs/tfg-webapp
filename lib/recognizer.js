const Recognizer = function () {
  const recognize = () => Promise.reject(new Error());
  const insert = () => Promise.resolve();

  return {
    recognize,
    insert
  };
}

module.exports = Recognizer;
