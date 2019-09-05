const parseProgressArgv = require('../utils/parseProgressArgv');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const paths = require('../config/paths');
const localSever = require(paths.entry);

/**
 * get configuration from configuration file
 */
function readConfiguration(f) {
  // 无论用户使用什么样的路径形式，这里统一使用全路径，保证全平台兼容和后期扩展性
  const fullFilePath = path.resolve(f);

  if (!fs.existsSync(fullFilePath)) {
    console.log(`${fullFilePath} ${colors.red('is not existed.')}`);
    return null;
  }

  const configs = {
    f: fullFilePath,
    ...require(fullFilePath),
  };

  return configs;
}

function startServer() {
  const userConfig = parseProgressArgv(process.argv);

  let configs = { ...userConfig };
  // 如果用户指定了配置文件，则优先从文件中读取配置并启动，忽略其他命令行参数
  if (userConfig && userConfig.f) {
    configs = readConfiguration(userConfig.f);
  }

  if (!configs) return false;

  localSever(configs);
}

startServer();

module.exports = startServer;
