const mount = require('koa-mount');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const colors = require('colors');
const parseProgressArgv = require('./utils/parseProgressArgv');

const app = new Koa();
const router = new Router();

// 默认配置项
const defaultConfig = {
  port: 3000,
  proxy: '',
};
const userConfig = parseProgressArgv(process.argv);
const config = {
  ...defaultConfig,
  ...userConfig,
};

// 校验 config
if (!config.port || isNaN(config.port)) {
  console.log(`${colors.yellow('进程已终止, 原因是:\n')} \t${colors.red('非法的端口号')}`);
  return false;
}
config.port = Number(config.port);

if (!config.mode || isNaN(config.mode)) {
  config.mode = 1;
} else {
  config.mode = Number(config.mode);
}

/**
 * 本服务提供两种模式访问。
 *  mode: 1     服务模式; 需要通过 /statics/... 这样的路径访问 statics 目录下的静态文件。此模式下，本服务提供的其他工具( 如 px 转 rem )依旧可用
 *  mode: 2     纯静态模式; 无需在路径前拼接 /statics 这样的公共路径。此模式下，仅提供静态文件访问，其他工具不可用
 */
if (config.mode === 1) {
  // root app
  router.get('/', (ctx) => {
    ctx.body = 'Hello World';
  });

  // statics mount app
  const staticsApp = new Koa();
  staticsApp.use(serve(`${__dirname}/statics`));

  app.use(mount('/statics', staticsApp));
  app.use(router.routes());
} else {
  app.use(serve(`${__dirname}/statics`));
}

app.listen(config.port);

console.log(`本地环境已启动\n\t ${colors.green(`http://localhost${config.port !== 80 ? `:${config.port}` : ''}`)}`);
