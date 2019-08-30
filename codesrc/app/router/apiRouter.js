const Router = require('koa-router');   
const apiController = require('../controller/api');
const config = require('../../config');

let router = new Router();
router.get('/', apiController.getMenus)
    .get(`/api/:fid`, apiController.getMenus)
    .get(`/article/:tid`, apiController.getArticle);

module.exports = router;
