const Router = require('koa-router');   
const apiController = require('../controller/api');

let router = new Router();
router.get('/', apiController.getMenus);

module.exports = router;
