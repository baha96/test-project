const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к PostgreSQL
const pool = new pg.Pool({
  user: 'baha',
  host: 'localhost',
  database: 'baha',
  password: '1',
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
