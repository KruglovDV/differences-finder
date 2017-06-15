import app from 'commander';
import diff from './';

export default () =>
  app
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f,  --format [opt]', 'Output format')
    .action((firstConfig, secondConfig) => {
      const format = app.format === undefined ? 'default' : app.format;
      const difference = diff(firstConfig, secondConfig, format);
      console.log(difference);
    });
