import app from 'commander';
import diff from './';

export default () =>
  app
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f,  --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      const difference = diff(firstConfig, secondConfig);
      console.log(difference);
    });
