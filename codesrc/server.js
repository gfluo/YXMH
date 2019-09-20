const Koa = require('koa');
const path = require('path');
const fs = require('fs');

const { logger, accessLogger } = require('./app/log');

const argv = process.argv;  //获取启动参数
if (argv.length < 3) {
    logger.error('请指定配置文件路径');
    process.exit(1);
} else {
    let configFile = argv[2];
    ///console.log(path.join(__dirname, configFile));
    fs.readFile(path.join(__dirname, configFile), (err, str) => {
        if (err) {
            logger.error(err);
        } else {
            const config = JSON.parse(str);
            global.config = config;

            const router = require('./app/router');
            ///const config = require('./config');
            const views = require('koa-views');
            const static = require('koa-static');

            const app = new Koa();

            app.use(accessLogger)
                .use(static(path.join(__dirname, './static')))
                .use(views(path.join(__dirname, './app/view'), { extension: 'ejs' }))
                .use(router.apiRouter.routes())
                .use(router.apiRouter.allowedMethods());

            app.listen(config.listenPort);
            logger.info(`Server is listening on port ${config.listenPort} now. Please open your chrome`);
        }
    })
}

