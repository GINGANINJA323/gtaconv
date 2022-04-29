const express = require('express');
const cors = require('cors');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const hotReloader = require('webpack-hot-middleware');
const { getBreadPrice } = require('./crawler');
const { DOMAIN, PORT, MODE } = require('./config.json');
const config = require('./webpack.dev');

const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.
server.use(express.static('public/static'));

server.get('/api/bread', async(_req, res) => {
  const bread = await getBreadPrice();
  res.send(bread);
});

if (MODE !== 'prod') {
  const compiler = webpack(config);
  server.use(middleware(compiler, {
    publicPath: config.output.publicPath
  })); // webpack dev middleware hook-in
  server.use(hotReloader(compiler)); // webpack hot reloader
} else {
  server.get('*', async(_req, res) => {
    res.render('index');
  });
}

server.listen(PORT, DOMAIN, () => console.log(`Server listening on ${DOMAIN}:${PORT}`));
