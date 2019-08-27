const Router = require('koa-router');   

let router = new Router();
router.get('/', async (ctx, next) => {
    ctx.body = 'Hello, koa';
})

module.exports = router;
