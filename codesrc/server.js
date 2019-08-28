const Koa = require('koa');
const path = require('path');
const router = require('./app/router');
const config = require('./config');
const views = require('koa-views');
const static = require('koa-static');
const { logger, accessLogger } = require('./app/log');

const app = new Koa();

app.use(accessLogger)
    .use(static(path.join(__dirname, './static')))
    .use(views(path.join(__dirname, './app/view'), { extension: 'ejs' }))
    .use(router.apiRouter.routes())
    .use(router.apiRouter.allowedMethods());

app.listen(config.listenPort);
logger.info(`Server is listening on port ${config.listenPort} now. Please open your chrome`);
