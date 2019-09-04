const parseProgressArgv = require('../utils/parseProgressArgv');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

function startServer() {
  const userConfig = parseProgressArgv(process.argv);

  // 如果用户指定了配置文件，则优先从文件中读取配置并启动，忽略其他命令行参数
  if (userConfig && userConfig.f) {
    // 无论用户使用什么样的路径形式，这里统一使用全路径，保证全平台兼容和后期扩展性
    userConfig.f = path.resolve(userConfig.f);
    if (!fs.existsSync(userConfig.f)) {
      console.log(`${userConfig.f} ${colors.red('is not existed.')}`);

      return false;
    }

    let configs;
    try {
      configs = JSON.parse(fs.readFileSync(userConfig.f, 'utf8'));

      if (typeof configs !== 'object') {
        throw new Error(`${userConfig.f} is not a right json file.`);
      }
    } catch(e) {
      console.log(colors.red(e.message));
    }

    console.log(configs);
    console.log(colors.green('Reading your config file and will start server soon'));
  }
}

startServer();

module.exports = startServer;
