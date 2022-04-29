const express = require('express');
const cors = require('cors');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const { getBreadPrice } = require('./crawler');
const { DOMAIN, PORT, MODE } = require('./config.json');
const config = require('./webpack.dev');

const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.
server.set('view engine', 'ejs');
server.set('views', 'public');
server.use(express.static('public'));

if (MODE === 'dev') {
  const compiler = webpack(config);
  server.use(middleware(compiler, { publicPath: "/public/dist" })); // webpack dev middleware hook-in
}

server.get('/api/bread', async(_req, res) => {
  const bread = await getBreadPrice();
  res.send(bread);
})

server.get('*', (_req, res) => {
  res.render('index');
});

server.listen(PORT, DOMAIN, () => console.log(`Server listening on ${DOMAIN}:${PORT}`));
