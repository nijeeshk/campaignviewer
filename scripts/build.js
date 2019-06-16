const yargs = require('yargs');

const { argv } = yargs.usage('Usage: $0 <command> --minify=<true/false>')
  .option('minify', {
    describe: 'Minifies build js code. Default value: true',
  })
  .help();

const webpack = require('webpack');
const configGenerator = require('../webpack/prod.config.js');

const config = configGenerator(argv);
const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.log('err:::', err);
  } else {
    console.log('stats:::', stats);
  }
});
