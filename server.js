const express = require('express');
const cors = require('cors');
const { getBreadPrice } = require('./crawler');
const { DOMAIN, PORT } = require('./config.json');
const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.
server.set('view engine', 'ejs');
server.set('views', 'public');
server.use(express.static('public'));

server.get('/api/bread', async(_req, res) => {
  const bread = await getBreadPrice();
  res.json(bread);
})

server.get('*', (_req, res) => {
  res.render('index');
})

server.listen(PORT, DOMAIN, () => console.log(`Server listening on ${DOMAIN}:${PORT}`));
