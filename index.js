const mount = require('koa-mount');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const colors = require('colors');
const parseProgressArgv = require('./utils/parseProgressArgv');

const app = new Koa();
const router = new Router();

// 默认配置项
const defaultConfig = {
  port: 3000,
  staticspath: `${__dirname}/statics`,
  proxypath: '/api',
  proxytarget: '',
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

// 代理配置
if (config.proxypath && config.proxytarget) {
  app.use(async (ctx, next) => {
    if (ctx.url.indexOf(config.proxypath) === 0) {
      ctx.respond = false;

      await k2c(httpProxy({
        target: config.proxytarget,
        changeOrigin: true,
        secure: false,
      }))(ctx, next);
    }

    await next();
  });
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
  staticsApp.use(serve(config.staticspath));

  app.use(mount('/statics', staticsApp));
  app.use(router.routes());
  // 应用自身的静态资源
  app.use(serve(`${__dirname}/public`));
} else {
  app.use(serve(config.staticspath));
}

app.listen(config.port);

console.log(`本地环境已启动\n\t ${colors.green(`http://localhost${config.port !== 80 ? `:${config.port}` : ''}`)}`);
