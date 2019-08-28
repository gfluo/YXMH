const Router = require('koa-router');   
const apiController = require('../controller/api');
const config = require('../../config');

let router = new Router();
router.get(`/api`, (ctx, next) => {
        ctx.redirect(`/api/${config.domain.fid}`);
    })
    .get(`/api/:fid`, apiController.getMenus);

module.exports = router;
