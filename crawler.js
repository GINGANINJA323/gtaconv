// This crawls Tesco's and Rockstar to get the prices.
const Nightmare = require('nightmare');
const nightmare = Nightmare();

const getBreadPrice = async() => {
  const breadSelector = 'span.value';
  const breadPrice = await nightmare.goto('https://www.tesco.com/groceries/en-GB/products/256174499')
    .evaluate((selector) => {
      console.log(document.querySelector(selector));
      console.log(document);
      return document.body;
    }, breadSelector);

  // console.log(breadPrice);
  return breadPrice;
}

module.exports = {
  getBreadPrice
}