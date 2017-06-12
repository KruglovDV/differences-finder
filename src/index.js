#!/usr/bin/env node

import app from 'commander';
import fs from 'fs';
import path from 'path';

const dir = path.normalize(`${__dirname}/test/`);

app
    .version('0.0.1')
    .command('crf <name>')
    .description('create file')
    .action((name) => {
        fs.open(`${dir}${name}`, 'wx', (err, fd) => {
            if (err) {
                console.error(err);
                return;
            }
            fs.close(fd, (err2) => {
                if (err2) {
                    console.error(err2);
                    return;
                }
                console.log('file sucssesefully created!');
            });
        });
    });

app
    .command('log <name>')
    .description('log file')
    .action((cmd, opt) => {
        console.log('log ' + cmd);
        console.log(opt);
    });

app.parse(process.argv);
