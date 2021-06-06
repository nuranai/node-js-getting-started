const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const PORT = process.env.PORT || 5000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/db', (req, res)=> {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT * FROM test_table');
      const ress = {
        'results' : (result) ? result.rows : null
      }
      res.render('pages/db', ress);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error" + err);
    }
  })
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

showTimes = () => {
  let res = '';
  const times = process.env.TIMES || 5;
  for (let i = 0; i < times; i++) {
    res += i + ' ';
  }
  return res;
}