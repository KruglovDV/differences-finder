import app from 'commander';
import diff from './difference';

export default () =>
  app
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f,  --format [type]', 'Output format')
    .action(diff);
