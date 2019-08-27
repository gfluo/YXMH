const Koa = require('koa');
const router = require('./app/router');
const config = require('./config');
const { logger, accessLogger } = require('./app/log');

global.config = config;

const app = new Koa();

app.use(accessLogger)
    .use(router.apiRouter.routes())
    .use(router.apiRouter.allowedMethods());

app.listen(global.config.listenPort);
logger.info(`Server is listening on port ${config.listenPort} now. Please open your chrome`);
