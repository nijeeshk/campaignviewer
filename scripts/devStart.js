const webpack = require('webpack');
const configGenerator = require('../webpack/dev.config');

const config = configGenerator();
const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.log('err:::', err);
  } else {
    console.log(stats, 'stats:::');
  }
});
