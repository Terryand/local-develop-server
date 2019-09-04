const parseProgressArgv = require('../utils/parseProgressArgv');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

const userConfig = parseProgressArgv(process.argv);

if (userConfig && userConfig.f) {
  // 无论用户使用什么样的路径形式，这里统一使用全路径，保证全平台兼容和后期扩展性
  userConfig.f = path.resolve(userConfig.f);
  if (!fs.existsSync(userConfig.f)) {
    console.log(`${userConfig.f} ${colors.red('is not existed.')}`);

    return false;
  }

  console.log(colors.green('Reading your config file and will start server soon'));
}
