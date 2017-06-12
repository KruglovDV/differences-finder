import app from 'commander';

export default () => {
    return app
        .version('0.0.1')
        .arguments('<cmd> [env]')
        .option('-f,  --format [type]', 'Output format');
};
