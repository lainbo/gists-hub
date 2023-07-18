var shell = require('shelljs');

shell.rm('-rf', './public/*');
shell.cp('-R', './src/*', './public/');
