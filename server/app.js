const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors')

const app = express();
const port = 3000;

const pool = new pg.Pool({
  user: 'baha',
  host: 'localhost',
  database: 'baha',
  password: '1',
  port: 5432,
});

app.use(bodyParser.json());

app.get(
  '/api/v1/projects',
  cors({ origin: "http://localhost:5173", methods: "GET", }),
  async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT
        project,
        constructive,
        under_constructive,
        work_group,
        block,
        floor,
        level,
        MIN(base_plan_start_date) AS min_base_plan_start_date,
        MAX(base_plan_finish_date) AS max_base_plan_finish_date,
        JSON_AGG(
            JSON_BUILD_OBJECT('contractor', contractor, 'plan_value', plan_value)
            ORDER BY CASE WHEN contractor IS NOT NULL THEN plan_value END DESC NULLS LAST
        ) AS contractors
    FROM
        table_first_task
    GROUP BY
        project, constructive, under_constructive, work_group, block, floor, level;`);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
