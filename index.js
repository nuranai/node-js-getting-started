const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
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