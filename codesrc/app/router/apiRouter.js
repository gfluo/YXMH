const Router = require('koa-router');   
const apiController = require('../controller/api');
const config = require('../../config');

let router = new Router();
router.get('/', apiController.topMenus)
    .get(`/list/:fid`, apiController.topMenus)
    .get(`/article/:tid`, apiController.getArticle);

module.exports = router;
