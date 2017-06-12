import app from 'commander';

export default () => {
  return app
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f,  --format [type]', 'Output format');
};
