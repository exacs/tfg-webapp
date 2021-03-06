const { Client } = require('pg');
const client = new Client();


function insert(data) {
  client.connect();
  const query =
    'INSERT INTO migrations(origin, destination, amount, startDate, endDate)' +
    'VALUES ($1, $2, $3, $4, $5) RETURNING *';

  const values = [
    data.origin,
    data.destination,
    data.amount,
    data.startDate,
    data.endDate
  ];

  return client.query(query, values);
}
